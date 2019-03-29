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
      if (imageData) {
        const layerId = props.layersState.addLayer(imageData, 'New Layer');
        props.appState.selectedLayer = layerId;
      } else {
        const layerId = props.layersState.newLayer();
        props.appState.selectedLayer = layerId;
      }
    },
  }),
);

export default enhancer(App);
