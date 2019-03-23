import React from 'react';
import * as S from './styles.js'
import ToolBox from '../ToolBox';
import LayeredCanvas from '../LayeredCanvas';
import Layers from '../Layers';
import { observer } from 'mobx-react';
import StandardButton from '../buttons/StandardButton';
import * as gs from '../../styleConstants.js';

const WorkShop = observer(props => (
  <S.WorkShop
    showCursor={props.showCursor} >
    <S.Left>
      <ToolBox
        tools={props.tools}
        selectedTool={props.appState.selectedTool}
        onToolSelect={props.onToolSelect}
        onSettingChange={props.onSettingChange} />
      <S.LayersContainer>
        <StandardButton type={gs.TYPE.BASIC} onClick={props.onNewLayer}>New Layer</StandardButton>
        <S.ScrollingWrapper>
          <S.Layers>
            <Layers
              selectedLayer={props.appState.selectedLayer}
              layers={props.layersState.layers}
              onLayerClick={props.onLayerClick}
              onLayerDelete={props.onLayerDelete} />
          </S.Layers>
        </S.ScrollingWrapper>
      </S.LayersContainer>
    </S.Left>
    <S.Center>
      <LayeredCanvas
        selectedLayer={props.appState.selectedLayer}
        layers={props.layersState.layers}
        onCanvasMouseUp={props.onLayeredCanvasMouseUp}
        onCanvasMouseDown={props.onLayeredCanvasMouseDown}
        onCanvasDraw={props.onLayeredCanvasDraw}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        onScaleChange={props.onScaleChange} />
    </S.Center>
  </S.WorkShop>
));

export default WorkShop;
