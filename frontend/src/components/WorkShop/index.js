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
      id: TOOLS.BRUSH.id,
      iconSrc: '/images/icons/brush.png',
      settings: props.appState.toolSettings[TOOLS.BRUSH.id],
    }, {
      id: TOOLS.ERASER.id,
      iconSrc: '/images/icons/eraser.png',
      settings: props.appState.toolSettings[TOOLS.ERASER.id],
    }],
  })),
  withHandlers({
    onToolSelect: props => id => {
      props.appState.selectedTool = id;
    },
    onSettingChange: props => (id, val) => {
      props.appState.toolSettings[props.appState.selectedTool][id].value = val;
    },
    onNewLayer: props => _ => {
      const layerId = props.layersState.newLayer();
      props.appState.selectedLayer = layerId;
    },
    onLayerClick: props => id => {
      props.appState.selectedLayer = id;
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
