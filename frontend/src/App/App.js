import React from 'react';
import Steps from '../components/Steps';
import UploadButton from '../components/buttons/UploadButton';
import * as S from './styles.js'
import { STEPS } from './util.js';
import CleanTools from '../components/CleanTools';

const App = props => (
  <S.App>
    <S.MiddleContainer>
      <S.CanvasContainer>
        { props.isCanvasNull &&
          <S.UploadImage>
            <p>Start by uploading an image!</p>
            <UploadButton onChange={props.onUpload}>Upload</UploadButton>
          </S.UploadImage>
        }
        <S.Canvas show={!props.isCanvasNull} ref={props.canvasRef}></S.Canvas>
      </S.CanvasContainer>
      <S.Steps>
        <Steps
          currentStep={props.currentStep}
          steps={[{
            id: 0,
            name: 'Upload',
          }, {
            id: 1,
            name: 'Clean',
          }]} />
      </S.Steps>
    </S.MiddleContainer>
    <S.RightContainer>
      { props.currentStep === STEPS.CLEAN &&
        <CleanTools />
      }
    </S.RightContainer>
  </S.App>
);

export default App;
