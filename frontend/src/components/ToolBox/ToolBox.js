import React from 'react';
import * as S from './styles.js';
import _ from 'lodash';
import Tool from '../Tool';

const ToolBox = props => (
  <S.ToolBox>
    { _.map(props.tools, tool => 
      <Tool
        key={tool.id}
        id={tool.id}
        iconSrc={tool.iconSrc}
        selected={props.selectedTool === tool.id}
        onClick={props.onToolSelect} />
    ) }
  </S.ToolBox>
);

export default ToolBox;
