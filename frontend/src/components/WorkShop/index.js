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
      name: "Brush",
    }, {
      id: TOOLS.ERASER,
      name: "Eraser",
    }],
  })),
  withHandlers({
    onToolSelect: props => id => {
      props.appState.selectedTool = id;
    },
  }),
);

export default enhancer(WorkShop);
