import React from 'react';
import * as S from './styles.js'

const Canvas = props => (
  <S.CanvasContainer
    onWheel={props.onWheel}
    onMouseDown={props.onMouseDown}
    onMouseMove={props.onMouseMove}
    onMouseUp={props.onMouseUp} >
    <S.Canvas
      ref={props.canvasRef}
      scale={props.scale}
      translateX={props.translateX}
      translateY={props.translateY} >
    </S.Canvas>
  </S.CanvasContainer>
);

export default Canvas;
