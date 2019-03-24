import React from 'react';
import * as S from './styles.js';

const Brush = props => (
  <S.Wrapper>
    <S.Container brushOffset={props.brushOffset}>
      <S.Brush size={props.brushSize}></S.Brush>
      <S.RopeBoundary size={props.ropeLength}></S.RopeBoundary>
    </S.Container>
    <S.Dot></S.Dot>
  </S.Wrapper>
);

export default Brush;
