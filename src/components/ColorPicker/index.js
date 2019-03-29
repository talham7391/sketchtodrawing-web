import { compose, withState, withStateHandlers, lifecycle, withHandlers } from 'recompose';
import ColorPicker from './ColorPicker';
import * as util from './util';

const enhancer = compose(
  withState('colorCanvasRef', 'setColorCanvasRef', null),
  withState('hueCanvasRef', 'setHueCanvasRef', null),
  withState('hue', 'setHue', 0),
  withState('canvasCoords', 'setCanvasCoords', {x: 254, y: 0}),
  withStateHandlers({
    chosenColor: {r: 255, g: 0, b: 0, a: 255},
  }, {
    setChosenColor: (_, props) => chosenColor => {
      props.onChange(chosenColor);
      return { chosenColor };
    },
  }),
  withState('colorMouseDown', 'setColorMouseDown', false),
  withState('hueMouseDown', 'setHueMouseDown', false),
  withStateHandlers(
    { colorCanvasImageData: null },
    {
      setColorCanvasImageData: (_, props) => imageData => {
        const canvas = props.colorCanvasRef;
        if (canvas) {
          canvas.width = 255;
          canvas.height = 255;
          const context = canvas.getContext('2d');
          context.putImageData(imageData, 0, 0);
        }
        return {
          colorCanvasImageData: imageData,
        };
      },
    }
  ),
  withStateHandlers(
    { hueCanvasImageData: null },
    {
      setHueCanvasImageData: (_, props) => imageData => {
        const canvas = props.hueCanvasRef;
        if (canvas) {
          canvas.width = 360;
          canvas.height = 1;
          const context = canvas.getContext('2d');
          context.putImageData(imageData, 0, 0);
        }
        return {
          hueCanvasImageData: imageData,
        };
      },
    }
  ),
  withHandlers({
    renderColorCanvas: props => ({hue} = {}) => {
      hue = hue || props.hue;
      const size = 255;
      const imageData = new ImageData(size, size);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const ri = Math.trunc(i / 4);
        const w = ri % size;
        const h = Math.trunc(ri / size);
        const rgb = util.getRGB(hue, w / size, 1 - h / size);
        imageData.data[i + 0] = rgb.r;
        imageData.data[i + 1] = rgb.g;
        imageData.data[i + 2] = rgb.b;
        imageData.data[i + 3] = 255;
      }
      props.setColorCanvasImageData(imageData);
      return imageData;
    },
    renderHueCanvas: props => _ => {
      const size = 360;
      const imageData = new ImageData(size, 1);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const ri = Math.trunc(i / 4);
        const w = ri % size;
        const rgb = util.getRGB(w, 1, 1);
        imageData.data[i + 0] = rgb.r;
        imageData.data[i + 1] = rgb.g;
        imageData.data[i + 2] = rgb.b;
        imageData.data[i + 3] = 255;
      }
      props.setHueCanvasImageData(imageData);
    },
    updateChosenColor: props => ({coords, imageData} = {}) => {
      coords = coords || props.canvasCoords;
      imageData = imageData || props.colorCanvasImageData;
      if (imageData) {
        const idx = (coords.x + coords.y * 255) * 4;
        const rgba = {
          r: imageData.data[idx + 0],
          g: imageData.data[idx + 1],
          b: imageData.data[idx + 2],
          a: imageData.data[idx + 3],
        };
        props.setChosenColor(rgba);
      }
    },
  }),
  withHandlers({
    handleColorCanvasMouse: props => (evt, colorMouseDown) => {
      colorMouseDown = colorMouseDown || props.colorMouseDown;
      if (colorMouseDown) {
        const x = util.restrict(0, evt.clientX - colorMouseDown.left, colorMouseDown.width);
        const y = util.restrict(0, evt.clientY - colorMouseDown.top, colorMouseDown.height);
        const coords = {
          x: Math.trunc(x / colorMouseDown.width * 254),
          y: Math.trunc(y / colorMouseDown.height * 254),
        };
        props.setCanvasCoords(coords);
        props.updateChosenColor({coords});
      }
    },
    handleHueCanvasMouse: props => (evt, hueMouseDown) => {
      hueMouseDown = hueMouseDown || props.hueMouseDown; 
      if (hueMouseDown) {
        const x = util.restrict(0, evt.clientX - hueMouseDown.left, hueMouseDown.width);
        const hue = Math.trunc(x / hueMouseDown.width * 360);
        props.setHue(hue);
        const imageData = props.renderColorCanvas({hue});
        props.updateChosenColor({imageData});
      }
    },
  }),
  withHandlers({
    onColorMouseDown: props => evt => {
      const rect = evt.target.getBoundingClientRect();
      props.setColorMouseDown(rect);
      props.handleColorCanvasMouse(evt, rect);
    },
    onHueMouseDown: props => evt => {
      const rect = evt.target.getBoundingClientRect();
      props.setHueMouseDown(rect);
      props.handleHueCanvasMouse(evt, rect);
    },
    onMouseUp: props => _ => {
      props.setColorMouseDown(false);
      props.setHueMouseDown(false);
    },
    onMouseMove: props => evt => {
      props.handleColorCanvasMouse(evt);
      props.handleHueCanvasMouse(evt);
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.setChosenColor({r: 255, g: 0, b: 0, a: 255});
      this.props.renderHueCanvas();
      this.props.renderColorCanvas();
      document.addEventListener('mousemove', this.props.onMouseMove);
      document.addEventListener('mouseup', this.props.onMouseUp);
    },

    componentWillUnmount() {
      document.removeEventListener('mousemove', this.props.onMouseMove);
      document.removeEventListener('mouseup', this.props.onMouseUp);
    },
  }),
);

export default enhancer(ColorPicker);
