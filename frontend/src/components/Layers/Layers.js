import React, { Component } from 'react';
import * as S from './styles.js'
import _ from 'lodash';
import { observer } from 'mobx-react';
import SmallIcon from '../buttons/SmallIcon';

const Layers = observer(props => (
  <S.Layers>
    { _.map(props.layers.slice().reverse(), layer => (
      <Layer
        key={layer.id}
        onClick={props.onLayerClick}
        onDelete={props.onLayerDelete}
        selected={props.selectedLayer === layer.id}
        layer={layer} />
    )) }
  </S.Layers>
));

class Layer extends Component {
  constructor (props) {
    super(props);

    this.onClick = _ => this.props.onClick && this.props.onClick(this.props.layer.id);

    this.onDelete = evt => {
      evt.stopPropagation();
      this.props.onDelete && this.props.onDelete(this.props.layer.id);
    };
  }

  render () {
    return (
      <S.Layer selected={this.props.selected} onClick={this.onClick}>
        <EnhancedCustomCanvas
          layer={this.props.layer} />
        <p>{this.props.layer.name}</p>
        <SmallIcon justIcon onClick={this.onDelete}><img src="/images/icons/trash.png" alt="Delete layer." /></SmallIcon>
      </S.Layer>
    );
  }
};

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
    if (nextProps.layer.dirty.layers) {
      this.renderImageData();
      nextProps.layer.dirty.layers = false;
    }
    return true;
  }

  render () {
    return (
      <canvas ref={this.canvasRef}></canvas>
    );
  }
};

const EnhancedCustomCanvas = observer(props => {
  _ = props.layer.dirty; // we need to dereference this property so that if it changes we rerender
  return <CustomCanvas {...props}/>
});

export default Layers;
