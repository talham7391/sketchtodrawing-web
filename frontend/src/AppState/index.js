import { observable, action } from 'mobx';
import _ from 'lodash';
import uuid from 'uuid/v1';

export const TOOLS = {
  BRUSH: 0,
  ERASER: 1,
};


const AppState = observable({
  selectedTool: null,
  selectedLayer: null,
});
export default AppState;


export const LayersState = observable({
  layers: [],

  addLayer (imageData, name) {
    this.layers.push({
      id: uuid(),
      zIndex: this.layers.length,
      imageData,
      name,
      dirty: {
        display: true,
        layers: true,
      },
    });
  },

  newLayer() {
    let imgd = null;
    if (this.layers.length === 0) {
      imgd = new ImageData(500, 500);
    } else {
      imgd = new ImageData(this.layers[0].imageData.width, this.layers[0].imageData.height);
    }
    this.addLayer(imgd, `New Layer ${this.layers.length + 1}`);
  },

  deleteLayer (id) {
    const l = _.find(this.layers, layer => layer.id === id);
    if (l) {
      _.remove(this.layers, layer => layer.id === id);
      _.each(this.layers, layer => {
        if (layer.zIndex > l.zIndex) {
          layer.zIndex -= 1;
        }
      });
    }
  },

}, {
  addLayer: action,
  newLayer: action,
  deleteLayer: action,
})