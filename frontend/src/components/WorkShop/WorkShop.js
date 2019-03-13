import React from 'react';
import * as S from './styles.js'
import ToolBar from '../ToolBar';
import LayeredCanvas from '../LayeredCanvas';
import Layers from '../Layers';
import { observer } from 'mobx-react';
import StandardButton from '../buttons/StandardButton';

const WorkShop = observer(props => (
  <S.WorkShop>
    <S.Center>
      <ToolBar
        tools={props.tools}
        onToolSelect={props.onToolSelect}
        selectedTool={props.appState.selectedTool} />
      <LayeredCanvas layers={props.layersState.layers}/>
    </S.Center>
    <S.Right>
      <StandardButton onClick={props.onNewLayer}>New Layer</StandardButton>
      <S.Layers><Layers layers={props.layersState.layers}/></S.Layers>
    </S.Right>
  </S.WorkShop>
));

export default WorkShop;
