import React from 'react';
import * as S from './styles.js'

const Tool = props => (
  <S.Tool
    selected={props.selected}
    src={props.iconSrc}
    onClick={props.onClick} />
);

export default Tool;
