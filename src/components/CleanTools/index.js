import { compose, withHandlers, withState } from 'recompose';
import CleanTools from './CleanTools';

const enhancer = compose(
  withState('blurRange', 'setBlurRange', [0, 10]),
  withState('blurAmount', 'setBlurAmount', 0),
  withHandlers({
    onBlurIncrease: props => _ => {
      const newBlurAmount = props.blurAmount + 1;
      if (newBlurAmount <= props.blurRange[1]) {
        props.setBlurAmount(newBlurAmount);
        props.onBlurChange(newBlurAmount);
      }
    },
    onBlurDecrease: props => _ => {
      const newBlurAmount = props.blurAmount - 1;
      if (newBlurAmount >= props.blurRange[0]) {
        props.setBlurAmount(newBlurAmount);
        props.onBlurChange(newBlurAmount);
      }
    },
  }),
  withState('thicknessRange', 'setThicknessRange', [-5, 5]),
  withState('thicknessAmount', 'setThicknessAmount', 0),
  withHandlers({
    onThicknessIncrease: props => _ => {
      const newThicknessAmount = props.thicknessAmount + 1;
      if (newThicknessAmount <= props.thicknessRange[1]) {
        props.setThicknessAmount(newThicknessAmount);
        props.onThicknessChange(newThicknessAmount);
      }
    },
    onThicknessDecrease: props => _ => {
      const newThicknessAmount = props.thicknessAmount - 1;
      if (newThicknessAmount >= props.thicknessRange[0]) {
        props.setThicknessAmount(newThicknessAmount);
        props.onThicknessChange(newThicknessAmount);
      }
    },
  }),
);

export default enhancer(CleanTools);
