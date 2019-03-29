import { compose, withHandlers, lifecycle, withState, withProps } from 'recompose';
import ContinuousSlider from './ContinuousSlider';

const enhancer = compose(
  withProps(props => {
    const dist = props.range[1] - props.range[0];
    const fromStart = props.value - props.range[0];
    return {
      left: fromStart / dist * 100,
    };
  }),
  withState('parentRef', 'setParentRef', null),
  withState('mouseDown', 'setMouseDown', false),
  withHandlers({
    moveDot: props => evt => {
      if (props.parentRef) {
        const r = props.parentRef.getBoundingClientRect();
        let p = (evt.clientX - r.left) / r.width;
        if (p < 0) {
          p = 0;
        } else if (p > 1) {
          p = 1;
        }
        props.onChange((props.range[1] - props.range[0]) * p + props.range[0]);
      }
    },
  }),
  withHandlers({
    onMouseDown: props => evt => {
      props.setMouseDown(true);
      props.moveDot(evt);
      props.onSliderStart();
    },
    onMouseUp: props => _ => {
      if (props.mouseDown) {
        props.onSliderStop();
      }
      props.setMouseDown(false);
    },
    onMouseMove: props => evt => {
      if (props.mouseDown) {
        props.moveDot(evt);
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      document.addEventListener('mouseup', this.props.onMouseUp);
      document.addEventListener('mousemove', this.props.onMouseMove);
    },
    componentWillUnmount() {
      document.removeEventListener('mouseup', this.props.onMouseUp);
      document.removeEventListener('mousemove', this.props.onMouseMove);
    },
  }),
);

export default enhancer(ContinuousSlider);
