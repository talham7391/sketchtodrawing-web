import React from 'react';
import * as S from './styles.js'
import _ from 'lodash';

const Layers = props => (
  <S.Layers>
    { _.map(props.layers, layer => (
      <S.Layer key={layer.zIndex}>
        {layer.name}
      </S.Layer>
    )) }
  </S.Layers>
);

export default Layers;
