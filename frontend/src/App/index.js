import { compose, withState, withHandlers } from 'recompose';
import App from './App';
import { STAGES } from './util.js';

const enhancer = compose(
  withState('stage', 'setStage', STAGES.UPLOAD),
  withHandlers({
    onImageData: props => _ => {
      props.setStage(STAGES.DRAWING);
    },
  }),
);

export default enhancer(App);
