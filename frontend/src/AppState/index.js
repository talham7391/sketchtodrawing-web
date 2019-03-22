import { observable, action } from 'mobx';
import _ from 'lodash';
import uuid from 'uuid/v1';

export const SETTING_TYPES = {
  RANGE: 0,
};

export const TOOL_SETTINGS = {
  BRUSH: {
    SIZE: 0,
    ROPE: 1,
  },
  ERASER: {
    SIZE: 2,
    ROPE: 3,
  },
};

export const TOOLS = {
  BRUSH: {
    id: 0,
    settings: {
      [TOOL_SETTINGS.BRUSH.SIZE]: {
        id: TOOL_SETTINGS.BRUSH.SIZE,
        name: 'Size',
        type: SETTING_TYPES.RANGE,
        range: [1, 50],
        initialValue: 10,
      },
      [TOOL_SETTINGS.BRUSH.ROPE]: {
        id: TOOL_SETTINGS.BRUSH.ROPE,
        name: 'Rope',
        type: SETTING_TYPES.RANGE,
        range: [0, 0.2],
        initialValue: 0,
      },
    },
  },
  ERASER: {
    id: 1,
    settings: {
      [TOOL_SETTINGS.ERASER.SIZE]: {
        id: TOOL_SETTINGS.ERASER.SIZE,
        name: 'Size',
        type: SETTING_TYPES.RANGE,
        range: [1, 50],
        initialValue: 10,
      },
      [TOOL_SETTINGS.ERASER.ROPE]: {
        id: TOOL_SETTINGS.ERASER.ROPE,
        name: 'Rope',
        type: SETTING_TYPES.RANGE,
        range: [0, 0.2],
        initialValue: 0,
      },
    },
  },
};


const AppState = observable({
  selectedTool: TOOLS.BRUSH.id,
  toolSettings: {
    [TOOLS.BRUSH.id]: initSettings(TOOLS.BRUSH.settings),
    [TOOLS.ERASER.id]: initSettings(TOOLS.ERASER.settings),
  },
  selectedToolProperties: null,
  selectedLayer: null,
});
export default AppState;


function initSettings(settings) {
  _.each(settings, setting => {
    setting.value = setting.initialValue;
  });
  return settings;
}


export const LayersState = observable({
  layers: [],

  addLayer (imageData, name) {
    const layerId = uuid();
    this.layers.push({
      id: layerId,
      zIndex: this.layers.length,
      imageData,
      name,
      dirty: {
        display: true,
        layers: true,
      },
    });
    return layerId;
  },

  newLayer() {
    let imgd = null;
    if (this.layers.length === 0) {
      imgd = new ImageData(500, 500);
    } else {
      imgd = new ImageData(this.layers[0].imageData.width, this.layers[0].imageData.height);
    }
    return this.addLayer(imgd, `New Layer ${this.layers.length + 1}`);
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

  updateLayerImageData (id, imageData) {
    for (let i = 0; i < this.layers.length; i++) {
      if (this.layers[i].id === id) {
        this.layers[i].imageData = imageData;
        this.layers[i].dirty = {
          display: this.layers[i].dirty.display,
          layers: true,
        };
        break;
      }
    }
  },

}, {
  addLayer: action,
  newLayer: action,
  deleteLayer: action,
  updateLayerImageData: action,
})