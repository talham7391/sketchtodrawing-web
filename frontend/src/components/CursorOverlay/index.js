import { compose, lifecycle, withProps, withHandlers } from 'recompose';
import CursorOverlay from './CursorOverlay';
import { CursorState } from '../../AppState';

const enhancer = compose(
  withProps({
    cursorState: CursorState,
  }),
  withHandlers({
    trackMouse: props => evt => {
      props.cursorState.mouseX = evt.clientX;
      props.cursorState.mouseY = evt.clientY;
    },
  }),
  lifecycle({
    componentDidMount() {
      document.addEventListener('mousemove', this.props.trackMouse);
    },
    componentWillUnmount() {
      document.removeEventListener('mousemove', this.props.trackMouse);
    }
  }),
);

export default enhancer(CursorOverlay);
