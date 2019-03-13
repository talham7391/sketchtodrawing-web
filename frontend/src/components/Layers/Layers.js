import React from 'react';
import * as S from './styles.js'
import _ from 'lodash';
import { observer } from 'mobx-react';

const Layers = observer(props => (
  <S.Layers>
    { _.map(props.layers.slice().reverse(), layer => (
      <S.Layer key={layer.zIndex}>
        <canvas></canvas>
        <p>{layer.name}</p>
      </S.Layer>
    )) }
  </S.Layers>
));

export default Layers;
