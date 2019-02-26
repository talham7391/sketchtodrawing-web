import React from 'react';
import { compose, withHandlers, withState } from 'recompose';
import App from './App';

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
        
        const context = props.canvasRef.current.getContext('2d');
        context.drawImage(img, 0, 0, props.canvasRef.current.width, props.canvasRef.current.height);
      }
    },
  })
);

export default enhancer(App);
