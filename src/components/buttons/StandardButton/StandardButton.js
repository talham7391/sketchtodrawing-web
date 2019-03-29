import React from 'react';
import * as S from './styles.js'

const StandardButton = props => (
  <S.StandardButton {...props} >
    {props.children}
  </S.StandardButton>
);

export default StandardButton;
