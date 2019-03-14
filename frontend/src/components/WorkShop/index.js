import { compose, withProps, withHandlers } from 'recompose';
import WorkShop from './WorkShop';
import AppState, { LayersState, TOOLS } from '../../AppState';

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
    onLayeredCanvasMouseDown: props => evt => {
      
    },
    onLayeredCanvasMouseUp: props => evt => {
      
    },
    onLayeredCanvasDraw: props => (canvas, id, percentageFromTop, percentageFromBottom) => {
      
    },
  }),
);

export default enhancer(WorkShop);
