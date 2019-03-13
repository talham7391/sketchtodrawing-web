import React from 'react';
import * as S from './styles.js'
import Steps from '../Steps';
import UploadButton from '../buttons/UploadButton';
import StandardButton from '../buttons/StandardButton';
import { STEPS } from './util.js';
import CleanTools from '../CleanTools';
import * as gs from '../../styleConstants.js';
import Canvas from '../Canvas';

const ImageUpload = props => (
  <S.ImageUpload>
    <S.MiddleContainer>
      <S.CanvasContainer>
        { props.isCanvasNull &&
          <S.UploadImage>
            <p>Start by uploading an image!</p>
            <UploadButton onChange={props.onUpload}>Upload</UploadButton>
          </S.UploadImage>
        }
        <S.Canvas show={!props.isCanvasNull}>
          <Canvas canvasRef={props.setCanvasRef} />
        </S.Canvas>
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
      <CleanTools
        isDisabled={props.currentStep === STEPS.UPLOAD}
        isSketchExtracted={props.isSketchExtracted}
        onExtractSketch={props.onExtractSketch}
        onBlurChange={props.onBlurChange}
        onThicknessChange={props.onThicknessChange} />
      <StandardButton
        type={gs.TYPE.SECONDARY}
        onClick={props.onStartDrawing} >
        { props.currentStep === STEPS.UPLOAD ? 'Skip Upload' : 'Start Drawing'}
      </StandardButton>
    </S.RightContainer>
  </S.ImageUpload>
);

export default ImageUpload;
