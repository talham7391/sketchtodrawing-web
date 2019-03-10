import { compose, withState, withHandlers } from 'recompose';
import App from './App';
import { STAGES } from './util.js';

const enhancer = compose(
  withState('stage', 'setStage', STAGES.UPLOAD),
  withState('imageData', 'setImageData', null),
  withHandlers({
    onImageData: props => imageData => {
      props.setStage(STAGES.DRAWING);
      props.setImageData(imageData);
    },
  }),
);

export default enhancer(App);
