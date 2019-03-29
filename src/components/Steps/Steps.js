import React from 'react';
import _ from 'lodash';
import * as S from './styles.js'

const Steps = props => (
  <S.Steps>
    { _.map(props.steps, step => 
      <S.Step key={step.id}>
        <S.Dot active={props.currentStep === step.id}></S.Dot>
        <S.Name active={props.currentStep === step.id}>{step.name}</S.Name>
      </S.Step>
    ) }
  </S.Steps>
);

export default Steps;
