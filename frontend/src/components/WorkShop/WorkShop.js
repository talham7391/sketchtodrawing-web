import React from 'react';
import * as S from './styles.js'
import ToolBar from '../ToolBar';
import LayeredCanvas from '../LayeredCanvas';
import Layers from '../Layers';
import { observer } from 'mobx-react';

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
      <Layers layers={props.layersState.layers}/>
    </S.Right>
  </S.WorkShop>
));

export default WorkShop;
