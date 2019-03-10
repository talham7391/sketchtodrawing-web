import { compose, withState, withPropsOnChange } from 'recompose';
import WorkShop from './WorkShop';

const enhancer = compose(
  withState('canvasRef', 'setCanvasRef', null),
  withPropsOnChange(['imageData', 'canvasRef'], props => {
    if (props.canvasRef && props.imageData) {
      const context = props.canvasRef.getContext('2d');
      props.canvasRef.width = props.imageData.width;
      props.canvasRef.height = props.imageData.height;
      context.imageSmoothEnabled = false;
      context.putImageData(props.imageData, 0, 0);
    }
  }),
);

export default enhancer(WorkShop);
