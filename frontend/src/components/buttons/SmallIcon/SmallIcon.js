import React from 'react';
import * as S from './styles.js'

const SmallIcon = props => (
  props.justIcon ?
  (<S.JustIcon {...props}>{props.children}</S.JustIcon>)
  :
  (<S.SmallIcon {...props} >{props.children}</S.SmallIcon>)
);

export default SmallIcon;
