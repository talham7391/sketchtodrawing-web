import { compose, withProps, withHandlers, withState } from 'recompose';
import WorkShop from './WorkShop';
import AppState, { LayersState, CursorState, TOOLS, TOOL_SETTINGS } from '../../AppState';
import * as CL from '../../CanvasLibrary';
import Brush from '../cursors/Brush';

const enhancer = compose(
  withState('showCursor', 'setShowCursor', true),
  withState('layeredCanvasScale', 'setLayeredCanvasScale', 1),
  withState('isDrawingAllowed', 'setIsDrawingAllowed', 1),
  withProps(_ => ({
    appState: AppState,
    layersState: LayersState,
    cursorState: CursorState,
  })),
  withProps(props => ({
    tools: [{
      id: TOOLS.BRUSH.id,
      iconSrc: '/images/icons/brush.png',
      settings: props.appState.toolSettings[TOOLS.BRUSH.id],
    }, {
      id: TOOLS.ERASER.id,
      iconSrc: '/images/icons/eraser.png',
      settings: props.appState.toolSettings[TOOLS.ERASER.id],
    }],
  })),
  withHandlers({
    onToolSelect: props => id => {
      props.appState.selectedTool = id;
    },
    onSettingChange: props => (id, val) => {
      props.appState.toolSettings[props.appState.selectedTool][id].value = val;
      if (props.cursorState.props) {
        props.cursorState.props.brushSize = props.appState.toolSettings[props.appState.selectedTool][TOOL_SETTINGS.SIZE].value * props.layeredCanvasScale;
        props.cursorState.props.ropeLength = props.appState.toolSettings[props.appState.selectedTool][TOOL_SETTINGS.ROPE].value * props.layeredCanvasScale;
      }
    },
    onNewLayer: props => _ => {
      const layerId = props.layersState.newLayer();
      props.appState.selectedLayer = layerId;
    },
    onLayerClick: props => id => {
      props.appState.selectedLayer = id;
    },
    onLayerDelete: props => id => {
      if (props.appState.selectedLayer === id) {
        props.appState.selectedLayer = null;
      }
      props.layersState.deleteLayer(id);
    },
    onLayerToggleVisibility: props => id => {
      props.layersState.toggleLayerVisibility(id);
    },
    onLayeredCanvasMouseDown: props => (evt, canvas, id, percentageFromLeft, percentageFromTop) => {
      if (props.isDrawingAllowed) {
        CL.setContext(props.appState, canvas, percentageFromLeft, percentageFromTop, props.layeredCanvasScale);
      }
    },
    onLayeredCanvasMouseUp: props => (evt, canvas, id, percentageFromLeft, percentageFromTop) => {
      if (props.isDrawingAllowed) {
        CL.commitDraw();
        props.layersState.updateLayerImageData(id, CL.getImageData(canvas));
        if (props.cursorState.props && props.cursorState.props.brushOffset) {
          props.cursorState.props.brushOffset = undefined;
        }
      }
    },
    onLayeredCanvasDraw: props => (evt, canvas, id, percentageFromLeft, percentageFromTop) => {
      if (props.isDrawingAllowed) {
        const p = CL.draw(props.appState, canvas, percentageFromLeft, percentageFromTop);
        if (props.cursorState.props) {
          const cr = canvas.getBoundingClientRect();
          props.cursorState.props.brushOffset = {
            x: cr.left + (cr.width * p.percentageFromLeft) - evt.clientX,
            y: cr.top + (cr.height * p.percentageFromTop) - evt.clientY,
          };
        }
      }
    },
    onMouseEnter: props => _ => {
      props.setShowCursor(false);
      props.cursorState.start(Brush, {
        brushSize: props.appState.toolSettings[props.appState.selectedTool][TOOL_SETTINGS.SIZE].value * props.layeredCanvasScale,
        ropeLength: props.appState.toolSettings[props.appState.selectedTool][TOOL_SETTINGS.ROPE].value * props.layeredCanvasScale,
      });
    },
    onMouseLeave: props => _ => {
      props.setShowCursor(true);
      props.cursorState.stop();
    },
    onScaleChange: props => scale => {
      props.setLayeredCanvasScale(scale);
      props.cursorState.props.brushSize = props.appState.toolSettings[props.appState.selectedTool][TOOL_SETTINGS.SIZE].value * scale;
      props.cursorState.props.ropeLength = props.appState.toolSettings[props.appState.selectedTool][TOOL_SETTINGS.ROPE].value * scale;
    },
    onSliderStart: props => _ => {
      props.setIsDrawingAllowed(false);
      props.cursorState.start(Brush, {
        brushSize: props.appState.toolSettings[props.appState.selectedTool][TOOL_SETTINGS.SIZE].value * props.layeredCanvasScale,
        ropeLength: props.appState.toolSettings[props.appState.selectedTool][TOOL_SETTINGS.ROPE].value * props.layeredCanvasScale,
      });
    },
    onSliderStop: props => id => {
      props.cursorState.stop();
      props.setIsDrawingAllowed(true);
    },
    onColorChange: props => color => {
      props.appState.color = color;
    },
  }),
);

export default enhancer(WorkShop);
