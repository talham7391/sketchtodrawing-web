import React from 'react';
import * as S from './styles.js'

const SmallIcon = props => (
  <S.SmallIcon {...props} >
    {props.children}
  </S.SmallIcon>
);

export default SmallIcon;
