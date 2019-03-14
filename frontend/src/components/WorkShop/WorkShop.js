import React from 'react';
import * as S from './styles.js'
import ToolBar from '../ToolBar';
import LayeredCanvas from '../LayeredCanvas';
import Layers from '../Layers';
import { observer } from 'mobx-react';
import StandardButton from '../buttons/StandardButton';
import * as gs from '../../styleConstants.js';

const WorkShop = observer(props => (
  <S.WorkShop>
    <S.Center>
      <ToolBar
        tools={props.tools}
        onToolSelect={props.onToolSelect}
        selectedTool={props.appState.selectedTool} />
      <LayeredCanvas
        selectedLayer={props.appState.selectedLayer}
        layers={props.layersState.layers}
        onCanvasMouseUp={props.onLayeredCanvasMouseUp}
        onCanvasMouseDown={props.onLayeredCanvasMouseDown}
        onCanvasDraw={props.onLayeredCanvasDraw} />
    </S.Center>
    <S.Right>
      <StandardButton type={gs.TYPE.BASIC} onClick={props.onNewLayer}>New Layer</StandardButton>
      <S.Layers>
        <Layers
          selectedLayer={props.appState.selectedLayer}
          layers={props.layersState.layers}
          onLayerClick={props.onLayerClick}
          onLayerDelete={props.onLayerDelete} />
      </S.Layers>
    </S.Right>
  </S.WorkShop>
));

export default WorkShop;
