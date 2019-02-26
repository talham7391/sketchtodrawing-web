import React from 'react';
import { compose, withHandlers, withState } from 'recompose';
import App from './App';
import * as CL from '../CanvasLibrary';

const enhancer = compose(
  withState('imageSource', 'setImageSource', null),
  withState('canvasRef', 'setCanvasRef', React.createRef()),
  withHandlers({
    onFileUpload: props => async evt => {
      if (evt && evt.target && evt.target.files) {
        const imgSrc = URL.createObjectURL(evt.target.files[0]);
        const img = new Image;
        img.src = imgSrc;

        const imgload = new Promise((res, rej) => {
          img.onload = res;
        });

        await imgload;
        
        props.canvasRef.current.width = 500;
        props.canvasRef.current.height = 600;
        const context = props.canvasRef.current.getContext('2d');
        context.drawImage(img, 0, 0, props.canvasRef.current.width, props.canvasRef.current.height);
      }
    },
    onAdaptiveThreshold: props => _ => {
      CL.adaptiveThreshold(props.canvasRef.current);
    },
  })
);

export default enhancer(App);
