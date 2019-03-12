import { compose, withState, withPropsOnChange, withProps, withHandlers } from 'recompose';
import WorkShop from './WorkShop';
import AppState from '../../AppState';

const TOOLS = {
  BRUSH: 0,
  ERASER: 1,
};

const enhancer = compose(
  withProps(_ => ({
    appState: AppState,
  })),
  withState('selectedTool', 'setSelectedTool', null),
  withPropsOnChange(['canvasRef'], props => {
    // if (props.canvasRef && props.imageData) {
    //   const context = props.canvasRef.getContext('2d');
    //   props.canvasRef.width = props.imageData.width;
    //   props.canvasRef.height = props.imageData.height;
    //   context.imageSmoothEnabled = false;
    //   context.putImageData(props.imageData, 0, 0);
    // }
  }),
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
      props.setSelectedTool(id);
    },
  }),
);

export default enhancer(WorkShop);
