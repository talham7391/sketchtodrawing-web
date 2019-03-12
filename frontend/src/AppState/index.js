import { observable, action } from 'mobx';

const AppState = observable({
  imageDatas: [],

  addImageData(id, imageData) {
    this.imageDatas.push({
      id,
      imageData,
    });
  }
  
}, {
  addImageData: action,
});

export default AppState;