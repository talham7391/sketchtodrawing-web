import React from 'react';
import * as S from './styles.js'
import StandardButton from '../buttons/StandardButton';
import DiscreteSlider from '../ui/DiscreteSlider';

const CleanTools = props => (
  <S.CleanTools>
    <S.Tool>
      <div>Extract Sketch</div>
      <div>Remove any light/shadows in the background.</div>
      <StandardButton>Apply</StandardButton>
    </S.Tool>
    <S.Tool>
      <div>Blur</div>
      <div>Soften your lines.</div>
      <DiscreteSlider
        range={props.blurRange}
        currentValue={props.blurAmount}
        onIncrease={props.onBlurIncrease}
        onDecrease={props.onBlurDecrease} />
    </S.Tool>
    <S.Tool>
      <div>Thickness</div>
      <div>Control the thickness of your lines.</div>
      <DiscreteSlider
        range={props.thicknessRange}
        currentValue={props.thicknessAmount}
        onIncrease={props.onThicknessIncrease}
        onDecrease={props.onThicknessDecrease} />
    </S.Tool>
  </S.CleanTools>
);

export default CleanTools;
