import React, { Component } from 'react';
import * as S from './styles.js'
import _ from 'lodash';
import { observer } from 'mobx-react';

const LayeredCanvas = observer(props => (
  <S.LayeredCanvas onWheel={props.onWheel} >
    { _.map(props.layers, layer => (
      <CustomCanvas
        key={layer.id}
        layer={layer}
        scale={props.scale}
        translateX={props.translateX}
        translateY={props.translateY}
        onCanvasMouseDown={props.onCanvasMouseDown}
        onCanvasMouseUp={props.onCanvasMouseUp}
        onCanvasDraw={props.onCanvasDraw}
        selected={props.selectedLayer === layer.id} />
    )) }
  </S.LayeredCanvas>
));

class CustomCanvas extends Component {
  constructor (props) {
    super(props);
    this.canvasRef = React.createRef();
    this.mouseDown = false;

    this.renderImageData = _ => {
      const canvas = this.canvasRef.current;
      if (canvas) {
        canvas.width = this.props.layer.imageData.width;
        canvas.height = this.props.layer.imageData.height;
        const context = canvas.getContext('2d');
        context.putImageData(this.props.layer.imageData, 0, 0);
      }
    };

    this.onMouseDown = evt => {
      this.mouseDown = true;
      this.props.onCanvasMouseDown && this.props.onCanvasMouseDown(evt);
    };

    this.onMouseUp = evt => {
      this.mouseDown = false;
      this.props.onCanvasMouseUp && this.props.onCanvasMouseUp(evt);
    };

    this.onMouseMove = evt => {
      if (this.mouseDown) {
        const canvas = this.canvasRef.current;
        if (canvas) {
          const cr = canvas.getBoundingClientRect();
          const distanceFromLeft = evt.clientX - cr.left;
          const distanceFromTop = evt.clientY - cr.top;
          const percentageFromLeft = distanceFromLeft / cr.width;
          const percentageFromTop = distanceFromTop / cr.height;
          this.props.onCanvasDraw && this.props.onCanvasDraw(canvas, this.props.layer.id, percentageFromLeft, percentageFromTop);
        }
      }
    };
  }

  componentDidMount () {
    this.renderImageData();
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.layer.dirty.display) {
      this.renderImageData();
      nextProps.layer.dirty.display = false;
    }
    return true;
  }

  render () {
    return (
      <S.Canvas
        selected={this.props.selected}
        zIndex={this.props.layer.zIndex}
        ref={this.canvasRef}
        scale={this.props.scale}
        translateX={this.props.translateX}
        translateY={this.props.translateY}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseMove={this.onMouseMove} >
      </S.Canvas>
    );
  }
}

export default LayeredCanvas;
