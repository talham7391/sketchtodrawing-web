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
      props.appState.selectedTool = id;
    },
    onNewLayer: props => _ => {
      props.layersState.newLayer();
    },
  }),
);

export default enhancer(WorkShop);
