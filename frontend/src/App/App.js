import React from 'react';
import {
  _App,
} from './styles.js'

const App = props => (
  <_App>
    <input type="file" onChange={props.onFileUpload} onLoad={_ => console.log('this ran')}/>
    <canvas ref={props.canvasRef} />
    <button onClick={props.onAdaptiveThreshold}>Adaptive Threshold</button>
  </_App>
);

export default App;
