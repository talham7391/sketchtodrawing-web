import React from 'react';
import * as S from './styles.js'
import Canvas from '../Canvas';
import ToolBar from '../ToolBar';
import Layers from '../Layers';

const WorkShop = props => (
  <S.WorkShop>
    <S.Center>
      <ToolBar
        tools={props.tools}
        onToolSelect={props.onToolSelect}
        selectedTool={props.selectedTool} />
      <Canvas canvasRef={props.setCanvasRef} />
    </S.Center>
    <S.Right>
      <Layers />
    </S.Right>
  </S.WorkShop>
);

export default WorkShop;
