import { compose, withProps } from 'recompose';
import DiscreteSlider from './DiscreteSlider';

const enhancer = compose(
  withProps(props => ({
    left: (props.currentValue - props.range[0]) / (props.range[1] - props.range[0]) * 100,
  })),
);

export default enhancer(DiscreteSlider);
