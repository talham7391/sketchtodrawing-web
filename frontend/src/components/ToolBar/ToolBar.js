import React, { Component } from 'react';
import * as S from './styles.js';
import _ from 'lodash';

const ToolBar = props => (
  <S.ToolBar>
    { _.map(props.tools, tool => 
      <Tool
        key={tool.id}
        id={tool.id}
        name={tool.name}
        selectedTool={props.selectedTool}
        onToolSelect={props.onToolSelect} />
    ) }
  </S.ToolBar>
);

class Tool extends Component {
  constructor (props) {
    super(props);
    this.onToolSelect = _ => props.onToolSelect(props.id);
  }
  
  render () {
    return (
      <S.Tool
        selected={this.props.selectedTool === this.props.id}
        onClick={this.onToolSelect}>
        {this.props.name}
      </S.Tool>
    )
  }
}

export default ToolBar;
