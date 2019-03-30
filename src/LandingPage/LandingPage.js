import React from 'react';
import * as S from './styles.js';
import StandardButton from '../components/buttons/StandardButton';
import { Link } from 'react-router-dom';

const LandingPage = props => (
  <S.LandingPage>
    <S.Banner>
      <S.Content>
        <h1>Sketch to Draw</h1>
        <h3>Minimalist tool to go from a sketch to a high fidelity graphic.</h3>
        <S.Button>
          <Link to="/draw"><StandardButton>Start Drawing</StandardButton></Link>
        </S.Button>
        <S.MainImage src="/images/gifs/waterfall.gif"/>
      </S.Content>
    </S.Banner>
  </S.LandingPage>
);

export default LandingPage;
