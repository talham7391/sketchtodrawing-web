import React from 'react';
import * as S from './styles.js';

const LandingPage = props => (
  <S.LandingPage>
    <S.Content>
      <h1>Sketch to Draw</h1>
      <h3>Minimalist tool to go from a sketch to a high fidelity graphic.</h3>
      <S.MainImage src="/images/gifs/waterfall.gif"/>
    </S.Content>
  </S.LandingPage>
);

export default LandingPage;
