import React, { Component } from 'react';
import * as S from './styles.js'
import _ from 'lodash';
import { observer } from 'mobx-react';

const LayeredCanvas = observer(props => (
  <S.LayeredCanvas
    onWheel={props.onWheel}
    onMouseDown={props.onMouseDown}
    onMouseMove={props.onMouseMove}
    onMouseUp={props.onMouseUp} >
    { _.map(props.layers, layer => (
      <CustomCanvas
        key={layer.zIndex}
        layer={layer}
        scale={props.scale}
        translateX={props.translateX}
        translateY={props.translateY} />
    )) }
  </S.LayeredCanvas>
));

class CustomCanvas extends Component {
  constructor (props) {
    super(props);
    this.canvasRef = React.createRef();
    this.renderImageData = _ => {
      const canvas = this.canvasRef.current;
      if (canvas) {
        canvas.width = this.props.layer.imageData.width;
        canvas.height = this.props.layer.imageData.height;
        const context = canvas.getContext('2d');
        context.putImageData(this.props.layer.imageData, 0, 0);
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
        zIndex={this.props.layer.zIndex}
        ref={this.canvasRef}
        scale={this.props.scale}
        translateX={this.props.translateX}
        translateY={this.props.translateY}>
      </S.Canvas>
    );
  }
}

export default LayeredCanvas;
