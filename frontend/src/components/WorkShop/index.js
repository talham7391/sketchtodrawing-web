import { compose, withProps, withHandlers } from 'recompose';
import WorkShop from './WorkShop';
import AppState, { LayersState, TOOLS } from '../../AppState';
import * as CL from '../../CanvasLibrary';

const enhancer = compose(
  withProps(_ => ({
    appState: AppState,
    layersState: LayersState,
  })),
  withProps(props => ({
    tools: [{
      id: TOOLS.BRUSH,
      iconSrc: '/images/icons/brush.png',
    }, {
      id: TOOLS.ERASER,
      iconSrc: '/images/icons/eraser.png',
    }],
  })),
  withHandlers({
    onToolSelect: props => id => {
      props.appState.selectedTool = props.appState.selectedTool === id ? null : id;
    },
    onNewLayer: props => _ => {
      props.layersState.newLayer();
    },
    onLayerClick: props => id => {
      props.appState.selectedLayer = props.appState.selectedLayer === id ? null : id;
    },
    onLayerDelete: props => id => {
      if (props.appState.selectedLayer === id) {
        props.appState.selectedLayer = null;
      }
      props.layersState.deleteLayer(id);
    },
    onLayeredCanvasMouseDown: props => (canvas, id, percentageFromLeft, percentageFromTop) => {
      CL.setContext(props.appState, canvas, percentageFromLeft, percentageFromTop);
    },
    onLayeredCanvasMouseUp: props => (canvas, id, percentageFromLeft, percentageFromTop) => {
      CL.commitDraw();
      props.layersState.updateLayerImageData(id, CL.getImageData(canvas));
    },
    onLayeredCanvasDraw: props => (canvas, id, percentageFromLeft, percentageFromTop) => {
      CL.draw(props.appState, canvas, percentageFromLeft, percentageFromTop);
    },
  }),
);

export default enhancer(WorkShop);
