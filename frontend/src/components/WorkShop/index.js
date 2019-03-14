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
    onLayerClick: props => zIndex => {
      props.appState.selectedLayer = props.appState.selectedLayer === zIndex ? null : zIndex;
    },
    onLayerDelete: props => zIndex => {
      if (props.appState.selectedLayer === zIndex) {
        props.appState.selectedLayer = null;
      }
      props.layersState.deleteLayer(zIndex);
    },
    onLayeredCanvasMouseDown: props => _ => console.log('down'),
    onLayeredCanvasMouseUp: props => _ => console.log('up'),
    onLayeredCanvasDraw: props => _ => console.log('draw'),
  }),
);

export default enhancer(WorkShop);
