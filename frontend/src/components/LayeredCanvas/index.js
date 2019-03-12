import { compose, withState, withHandlers } from 'recompose';
import LayeredCanvas from './LayeredCanvas';
import { isShiftKeyDown } from '../../App/util';

function computeScale(x) {
  const result = Math.pow(2, x - 10)
  return result < 0 ? 0 : result;
}

const enhancer = compose(
  withState('implicitScale', 'setImplicitScale', 10),
  withState('scale', 'setScale', 1),
  withState('translateX', 'setTranslateX', -50),
  withState('translateY', 'setTranslateY', -50),
  withHandlers({
    onWheel: props => evt => {
      if (isShiftKeyDown()) {
        const x = props.implicitScale + evt.deltaY / 100;
        const implicitScale = x > 0 ? x : 0;
        props.setImplicitScale(implicitScale);
        const scale = computeScale(implicitScale);
        props.setScale(scale);
      } else {
        const x = props.translateX - evt.deltaX / 10;
        const y = props.translateY - evt.deltaY / 10;
        props.setTranslateX(x);
        props.setTranslateY(y);
      }
    },
  }),
);

export default enhancer(LayeredCanvas);
