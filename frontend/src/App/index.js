import { compose, withState, withHandlers, withProps } from 'recompose';
import App from './App';
import { STAGES } from './util.js';
import AppState from '../AppState';

const enhancer = compose(
  withProps(_ => ({
    appState: AppState,
  })),
  withState('stage', 'setStage', STAGES.UPLOAD),
  withHandlers({
    onImageData: props => imageData => {
      props.setStage(STAGES.DRAWING);
      props.appState.addImageData(imageData);
    },
  }),
);

export default enhancer(App);
