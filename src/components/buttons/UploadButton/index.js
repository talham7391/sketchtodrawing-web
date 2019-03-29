import { compose, withState, withHandlers } from 'recompose';
import UploadButton from './UploadButton';
import React from 'react';

const enhancer = compose(
  withState('inputRef', 'setInputRef', React.createRef()),
  withHandlers({
    onFileInputClick: _ => evt => {
      evt.stopPropagation();
    },
    onUploadClick: props => _ => {
      props.inputRef.current.click();
    },
  }),
);

export default enhancer(UploadButton);
