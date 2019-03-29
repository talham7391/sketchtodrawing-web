import React from 'react';
import * as S from './styles.js';
import SmallIcon from '../../buttons/SmallIcon';

const DiscreteSlider = props => (
  <S.DiscreteSlider>
    <SmallIcon onClick={props.onDecrease} isDisabled={props.isDisabled}>-</SmallIcon>
    <S.Slider>
      <S.Base></S.Base>
      <S.Dot left={props.left} isDisabled={props.isDisabled}></S.Dot>
    </S.Slider>
    <SmallIcon onClick={props.onIncrease} isDisabled={props.isDisabled}>+</SmallIcon>
  </S.DiscreteSlider>
);

export default DiscreteSlider;
