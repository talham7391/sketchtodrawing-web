import React from 'react';
import * as S from './styles.js';
import SmallIcon from '../../buttons/SmallIcon';

const DiscreteSlider = props => (
  <S.DiscreteSlider>
    <SmallIcon onClick={props.onDecrease}>-</SmallIcon>
    <S.Slider>
      <S.Base></S.Base>
      <S.Dot left={props.left}></S.Dot>
    </S.Slider>
    <SmallIcon onClick={props.onIncrease}>+</SmallIcon>
  </S.DiscreteSlider>
);

export default DiscreteSlider;
