import { observable, action } from 'mobx';

export const TOOLS = {
  BRUSH: 0,
  ERASER: 1,
};


const AppState = observable({
  selectedTool: null,
});
export default AppState;


export const LayersState = observable({
  layers: [],

  addLayer (imageData, name) {
    this.layers.push({
      zIndex: this.layers.length,
      imageData,
      name,
      dirty: {
        display: true,
        layers: true,
      },
    });
  },

}, {
  addLayer: action,
})