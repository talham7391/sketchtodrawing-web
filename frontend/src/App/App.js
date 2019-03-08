import React from 'react';
import * as S from './styles.js'
import ImageUpload from '../components/ImageUpload';
import { STAGES } from './util.js';

const App = props => (
  <S.App>
    { props.stage === STAGES.UPLOAD &&
      <ImageUpload onImageData={props.onImageData} />
    }
    { props.stage === STAGES.DRAWING &&
      <div>You can start drawing now!</div>
    }
  </S.App>
);

export default App;
