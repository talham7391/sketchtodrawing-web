import React from 'react';
import * as S from './styles.js'
import Canvas from '../Canvas';

const WorkShop = props => (
  <S.WorkShop>
    <Canvas canvasRef={props.setCanvasRef} />
  </S.WorkShop>
);

export default WorkShop;
