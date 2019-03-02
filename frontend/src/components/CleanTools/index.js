import { compose, withHandlers, withState } from 'recompose';
import CleanTools from './CleanTools';

const enhancer = compose(
  withState('blurRange', 'setBlurRange', [0, 10]),
  withState('blurAmount', 'setBlurAmount', 0),
  withHandlers({
    onBlurIncrease: props => _ => {
      if (props.blurAmount + 1 <= props.blurRange[1]) {
        props.setBlurAmount(props.blurAmount + 1);
      }
    },
    onBlurDecrease: props => _ => {
      if (props.blurAmount - 1 >= props.blurRange[0]) {
        props.setBlurAmount(props.blurAmount - 1);
      }
    },
  }),
  withState('thicknessRange', 'setThicknessRange', [-5, 5]),
  withState('thicknessAmount', 'setThicknessAmount', 0),
  withHandlers({
    onThicknessIncrease: props => _ => {
      if (props.thicknessAmount + 1 <= props.thicknessRange[1]) {
        props.setThicknessAmount(props.thicknessAmount + 1);
      }
    },
    onThicknessDecrease: props => _ => {
      if (props.thicknessAmount - 1 >= props.thicknessRange[0]) {
        props.setThicknessAmount(props.thicknessAmount - 1);
      }
    },
  }),
);

export default enhancer(CleanTools);
