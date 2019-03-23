import { TOOLS, TOOL_SETTINGS } from '../AppState';
import _ from 'lodash';

// function getMean(pixelData, x, y, ) {

// }

function xytoidx (x, y, width, height) {
  return y * 4 * width + x * 4;
}


function setRGBA (pixelData, x, y, rgba) {
  const idx = xytoidx(x, y, pixelData.width, pixelData.height);
  pixelData.data[idx + 0] = rgba[0];
  pixelData.data[idx + 1] = rgba[1];
  pixelData.data[idx + 2] = rgba[2];
  pixelData.data[idx + 3] = rgba[3];
}


function getRGBA (pixelData, x, y) {
  const idx = xytoidx(x, y, pixelData.width, pixelData.height);
  return [pixelData.data[idx + 0], pixelData.data[idx + 1], pixelData.data[idx + 2], pixelData.data[idx + 3]];
}


function averageRGB (rgba) {
  return (rgba[0] + rgba[1] + rgba[2]) / 3;
}


function getMean (pixelData, givenX, givenY, blockSize, C) {
  const sum = [0, 0, 0, 0];
  let num = 0;
  for (let y = givenY - blockSize; y < givenY + blockSize; y++) {
    for (let x = givenX - blockSize; x < givenX + blockSize; x++) {
      if (0 <= x && x < pixelData.width && 0 <= y && y < pixelData.height) {
        const rgba = getRGBA(pixelData, x, y);
        sum[0] += rgba[0];
        sum[1] += rgba[1];
        sum[2] += rgba[2];
        sum[3] += rgba[3];
        num++;
      }
    }
  }
  return sum.map(x => x / num - C);
}


export function adaptiveThreshold(canvas) {
  const context = canvas.getContext('2d');
  const pixelData = context.getImageData(0, 0, canvas.width, canvas.height);
  const newPixelData = new ImageData(pixelData.width, pixelData.height);
  for (let y = 0; y < pixelData.height; y++) {
    for (let x = 0; x < pixelData.width; x++) {
      const mean = averageRGB(getMean(pixelData, x, y, 5, 11));
      if (averageRGB(getRGBA(pixelData, x, y)) >= mean) {
        setRGBA(newPixelData, x, y, [255, 255, 255, 255]);
      } else {
        setRGBA(newPixelData, x, y, [0, 0, 0, 255]);
      }
    }
  }
  context.putImageData(newPixelData, 0, 0);
}


export function blur(canvas, iterations) {
  if (iterations === 0) {
    return;
  }
  const context = canvas.getContext('2d');
  const pixelData = context.getImageData(0, 0, canvas.width, canvas.height);
  const newPixelData = new ImageData(pixelData.width, pixelData.height);
  for (let y = 0; y < pixelData.height; y++) {
    for (let x = 0; x < pixelData.width; x++) {
      const mean = getMean(pixelData, x, y, 1, 0);
      setRGBA(newPixelData, x, y, mean);
    }
  }
  context.putImageData(newPixelData, 0, 0);
  blur(canvas, iterations - 1);
}


export function erode(canvas, iterations) {
  if (iterations === 0) {
    return;
  }
  const context = canvas.getContext('2d');
  const pixelData = context.getImageData(0, 0, canvas.width, canvas.height);
  const newPixelData = new ImageData(pixelData.width, pixelData.height);
  for (let y = 0; y < pixelData.height; y++) {
    for (let x = 0; x < pixelData.width; x++) {
      const mean = averageRGB(getMean(pixelData, x, y, 1, 0));
      if (mean <= 5) {
        setRGBA(newPixelData, x, y, [0, 0, 0, 255]);
      } else {
        setRGBA(newPixelData, x, y, [255, 255, 255, 255]);
      }
    }
  }
  context.putImageData(newPixelData, 0, 0);
  erode(canvas, iterations - 1);
}

export function dilate(canvas, iterations) {
  if (iterations === 0) {
    return;
  }
  const context = canvas.getContext('2d');
  const pixelData = context.getImageData(0, 0, canvas.width, canvas.height);
  const newPixelData = new ImageData(pixelData.width, pixelData.height);
  for (let y = 0; y < pixelData.height; y++) {
    for (let x = 0; x < pixelData.width; x++) {
      const mean = averageRGB(getMean(pixelData, x, y, 1, 0));
      if (mean <= 250) {
        setRGBA(newPixelData, x, y, [0, 0, 0, 255]);
      } else {
        setRGBA(newPixelData, x, y, [255, 255, 255, 255]);
      }
    }
  }
  context.putImageData(newPixelData, 0, 0);
  dilate(canvas, iterations - 1);
}


const drawingContext = {
  tool: null,
  startedAt: null,
  originalImageData: null,
  pathDrawn: [],
  brushSize: null,
  rope: null,
};


export function setContext(settings, canvas, percentageFromLeft, percentageFromTop) {
  drawingContext.tool = settings.selectedTool;
  drawingContext.startedAt = {
    x: percentageFromLeft * canvas.width,
    y: percentageFromTop * canvas.height,
  };
  const context = canvas.getContext('2d');
  drawingContext.originalImageData = context.getImageData(0, 0, canvas.width, canvas.height);

  drawingContext.brushSize = settings.toolSettings[settings.selectedTool][TOOL_SETTINGS.SIZE].value;
  drawingContext.rope = settings.toolSettings[settings.selectedTool][TOOL_SETTINGS.ROPE].value;
}


export function commitDraw() {
  drawingContext.tool = null;
  drawingContext.startedAt = null;
  drawingContext.originalImageData = null;
  drawingContext.pathDrawn = [];
  drawingContext.brushSize = null;
}


export function getImageData(canvas) {
  const context = canvas.getContext('2d');
  return context.getImageData(0, 0, canvas.width, canvas.height);
}


export function draw(settings, canvas, percentageFromLeft, percentageFromTop) {
  const context = canvas.getContext('2d');

  const enterpolatedDraw = drawFunc => {
    const previousPoint = _.last(drawingContext.pathDrawn);
    if (previousPoint) {
      const distance = Math.sqrt(
        Math.pow(percentageFromLeft - previousPoint.percentageFromLeft, 2)
        + 
        Math.pow(percentageFromTop - previousPoint.percentageFromTop, 2)
      );

      const drawAtDistance = distance - drawingContext.rope;
      if (drawAtDistance > 0) {
        const d = drawAtDistance / distance;
        const nl = previousPoint.percentageFromLeft + (percentageFromLeft - previousPoint.percentageFromLeft) * d;
        const nt = previousPoint.percentageFromTop + (percentageFromTop - previousPoint.percentageFromTop) * d;
        const JUMP = drawingContext.brushSize / 1000;
        for (let i = JUMP; i < drawAtDistance; i += JUMP) {
          const p = i / drawAtDistance;
          const pfl = nl - (nl - previousPoint.percentageFromLeft) * p;
          const pft = nt - (nt - previousPoint.percentageFromTop) * p;
          drawFunc(pfl, pft, false);
        }
        drawFunc(nl, nt);
      }
    } else {
      drawFunc(percentageFromLeft, percentageFromTop);
    }
  };

  if (drawingContext.tool === TOOLS.BRUSH.id) {
    const paintArc = (l, t, pushToPath = true) => {
      context.beginPath();
      context.arc(canvas.width * l, canvas.height * t, drawingContext.brushSize, 0, 2 * Math.PI);
      context.fill();
      context.closePath();
      if (pushToPath) {
        drawingContext.pathDrawn.push({percentageFromLeft: l, percentageFromTop: t});
      }
    };
    enterpolatedDraw(paintArc);
  } else if (drawingContext.tool === TOOLS.ERASER.id) {
    const eraseArc = (l, t, pushToPath = true) => {
      context.save();
      context.beginPath();
      context.arc(canvas.width * l, canvas.height * t, drawingContext.brushSize, 0, 2 * Math.PI);
      context.clip();
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.closePath();
      context.restore();
      if (pushToPath) {
        drawingContext.pathDrawn.push({percentageFromLeft: l, percentageFromTop: t});
      }
    };
    enterpolatedDraw(eraseArc);
  }
}