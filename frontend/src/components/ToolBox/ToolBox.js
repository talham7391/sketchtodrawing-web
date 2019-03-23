import React, { Component } from 'react';
import * as S from './styles.js';
import _ from 'lodash';
import Tool from '../Tool';
import { SETTING_TYPES } from '../../AppState';
import ContinuousSlider from '../ui/ContinuousSlider';
import { observer } from 'mobx-react';

const ToolBox = observer(props => (
  <S.ToolBox>
    <S.Tools>
      { _.map(props.tools, tool => 
        <Tool
          key={tool.id}
          id={tool.id}
          iconSrc={tool.iconSrc}
          selected={props.selectedTool === tool.id}
          onClick={props.onToolSelect} />
      ) }
    </S.Tools>
    <S.Settings>
      { props.settings && _.map(props.settings, setting => (
        <S.Setting key={`${props.selectedTool},${setting.id}`}>
          <div>{setting.name}</div>
          { setting.type === SETTING_TYPES.RANGE &&
            <EnhancedContinuousSlider
              id={setting.id}
              range={setting.range}
              onChange={props.onSettingChange}
              value={setting.value} />
          }
        </S.Setting>
      )) }
    </S.Settings>
  </S.ToolBox>
));


class EnhancedContinuousSlider extends Component {
  constructor(props) {
    super(props);
    this.onChange = val => {
      this.props.onChange && this.props.onChange(this.props.id, val);
    };
  }
  render() {
    return (
      <ContinuousSlider
        range={this.props.range}
        onChange={this.onChange}
        value={this.props.value} />
    );
  }
}

export default ToolBox;
