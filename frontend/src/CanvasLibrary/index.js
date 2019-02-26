

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


function getMean (pixelData, given_x, given_y, c) {
  const sum = [0, 0, 0, 0];
  let num = 0;
  for (let y = given_y - c; y < given_y + c; y++) {
    for (let x = given_x - c; x < given_x + c; x++) {
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
  return sum.map(x => x / num);
}


export function adaptiveThreshold(canvas) {
  const context = canvas.getContext('2d');
  const pixelData = context.getImageData(0, 0, canvas.width, canvas.height);
  const newPixelData = new ImageData(pixelData.width, pixelData.height);
  for (let y = 0; y < pixelData.height; y++) {
    for (let x = 0; x < pixelData.width; x++) {
      const mean = averageRGB(getMean(pixelData, x, y, 5));
      if (averageRGB(getRGBA(pixelData, x, y)) >= mean) {
        setRGBA(newPixelData, x, y, [255, 255, 255, 255]);
      } else {
        setRGBA(newPixelData, x, y, [0, 0, 0, 255]);
      }
    }
  }
  context.putImageData(newPixelData, 0, 0);
}