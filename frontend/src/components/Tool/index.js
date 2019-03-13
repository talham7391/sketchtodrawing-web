import { compose, withHandlers } from 'recompose';
import Tool from './Tool';

const enhancer = compose(
  withHandlers({
    onClick: props => _ => props.onClick(props.id),
  })
);

export default enhancer(Tool);
