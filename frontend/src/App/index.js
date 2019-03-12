import { compose, withState, withHandlers, withProps } from 'recompose';
import App from './App';
import { STAGES } from './util.js';
import AppState, { LayersState } from '../AppState';

const enhancer = compose(
  withProps(_ => ({
    appState: AppState,
    layersState: LayersState,
  })),
  withState('stage', 'setStage', STAGES.UPLOAD),
  withHandlers({
    onImageData: props => imageData => {
      props.setStage(STAGES.DRAWING);
      props.layersState.addLayer(imageData, 'New Layer');
    },
  }),
);

export default enhancer(App);
