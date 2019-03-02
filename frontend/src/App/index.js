import { compose, withState, withHandlers } from 'recompose';
import App from './App';
import React from 'react';
import { STEPS } from './util.js';

const enhancer = compose(
  withState('isCanvasNull', 'setIsCanvasNull', true),
  withState('canvasRef', 'setCanvasRef', React.createRef()),
  withState('currentStep', 'setCurrentStep', STEPS.UPLOAD),
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
        props.setCurrentStep(props.currentStep + 1);
      }
    },
  }),
);

export default enhancer(App);
