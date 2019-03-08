import { compose, withState, withHandlers } from 'recompose';
import ImageUpload from './ImageUpload';
import React from 'react';
import { STEPS } from './util.js';
import * as CL from '../../CanvasLibrary';

function thickenThenBlur (canvas, blur, thickness) {
  if (thickness > 0) {
    CL.dilate(canvas, thickness);
  } else if (thickness < 0) {
    CL.erode(canvas, thickness * -1);
  }
  if (blur > 0) {
    CL.blur(canvas, blur);
  }
}

const enhancer = compose(
  withState('isCanvasNull', 'setIsCanvasNull', true),
  withState('canvasRef', 'setCanvasRef', React.createRef()),
  withState('currentStep', 'setCurrentStep', STEPS.UPLOAD),
  withState('originalImageData', 'setOriginalImageData', null),
  withState('blur', 'setBlur', 0),
  withState('thickness', 'setThickness', 0),
  withState('isSketchExtracted', 'setIsSketchExtracted', false),
  withHandlers({
    onUpload: props => async evt => {
      if (evt.target.files.length === 1) {
        const fileUrl = URL.createObjectURL(evt.target.files[0]);
        const img = new Image();
        img.src = fileUrl;
        
        const imgload = new Promise((res, rej) => {
          img.onload = res;
        });

        await imgload;

        const context = props.canvasRef.current.getContext('2d');
        props.canvasRef.current.width = img.width;
        props.canvasRef.current.height = img.height;
        context.imageSmoothEnabled = false;
        context.drawImage(img, 0, 0);

        props.setIsCanvasNull(false);
        props.setOriginalImageData(context.getImageData(0, 0, props.canvasRef.current.width, props.canvasRef.current.width));
        props.setCurrentStep(props.currentStep + 1);
      }
    },
    onExtractSketch: props => _ => {
      CL.adaptiveThreshold(props.canvasRef.current);
      const context = props.canvasRef.current.getContext('2d');
      props.setOriginalImageData(context.getImageData(0, 0, props.canvasRef.current.width, props.canvasRef.current.width));
      props.setIsSketchExtracted(true);
    },
    onBlurChange: props => val => {
      const context = props.canvasRef.current.getContext('2d');
      context.putImageData(props.originalImageData, 0, 0);
      props.setBlur(val);
      thickenThenBlur(props.canvasRef.current, val, props.thickness);
    },
    onThicknessChange: props => val => {
      const context = props.canvasRef.current.getContext('2d');
      context.putImageData(props.originalImageData, 0, 0);
      props.setThickness(val);
      thickenThenBlur(props.canvasRef.current, props.blur, val);
    },
    onStartDrawing: props => _ => {
      const canvas = props.canvasRef.current;
      const context = canvas.getContext('2d');
      props.onImageData(context.getImageData(0, 0, canvas.width, canvas.height), canvas.width, canvas.height);
    },
  }),
);

export default enhancer(ImageUpload);
