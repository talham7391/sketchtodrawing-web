import React, { Fragment } from 'react';
import * as S from './styles.js'
import ImageUpload from '../components/ImageUpload';
import { STAGES } from './util.js';
import WorkShop from '../components/WorkShop';
import { observer } from 'mobx-react';
import CursorOverlay from '../components/CursorOverlay';
import { Prompt } from 'react-router-dom';

const App = observer(props => (
  <Fragment>
    <S.App>
      { props.stage === STAGES.UPLOAD &&
        <ImageUpload onImageData={props.onImageData} />
      }
      { props.stage === STAGES.DRAWING &&
        <WorkShop />
      }
    </S.App>
    <CursorOverlay />
    <Prompt message="Are you sure you want to leave?"/>
  </Fragment>
));

export default App;
