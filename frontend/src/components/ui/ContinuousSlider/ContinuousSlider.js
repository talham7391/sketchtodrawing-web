import React from 'react';
import * as S from './styles.js';

const ContinuousSlider = props => (
  <S.ContinuousSlider
    onMouseDown={props.onMouseDown}
    ref={props.setParentRef}>
    <S.Base></S.Base>
    <S.Dot
      left={props.left}
      isDisabled={props.isDisabled}>
    </S.Dot>
  </S.ContinuousSlider>
);

export default ContinuousSlider;
