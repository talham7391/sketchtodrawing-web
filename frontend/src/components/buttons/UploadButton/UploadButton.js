import React from 'react';
import * as S from './styles.js'
import StandardButton from '../StandardButton';

const UploadButton = props => (
  <StandardButton onClick={props.onUploadClick}>
    {props.children}
    <S.Input type="file" ref={props.inputRef} onClick={props.onFileInputClick} onChange={props.onChange}/>
  </StandardButton>
);

export default UploadButton;
