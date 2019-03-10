import React from 'react';
import * as S from './styles.js'
import ImageUpload from '../components/ImageUpload';
import { STAGES } from './util.js';
import WorkShop from '../components/WorkShop';

const App = props => (
  <S.App>
    { props.stage === STAGES.UPLOAD &&
      <ImageUpload onImageData={props.onImageData} />
    }
    { props.stage === STAGES.DRAWING &&
      <WorkShop imageData={props.imageData} />
    }
  </S.App>
);

export default App;
