import React from 'react';
import * as S from './styles.js';

const ColorPicker = props => (
  <S.ColorPicker>
    <S.CanvasContainer>
      <S.ColorCanvas
        ref={props.setColorCanvasRef}
        onMouseDown={props.onColorMouseDown}>
      </S.ColorCanvas>
      <S.HueCanvas
        ref={props.setHueCanvasRef}
        onMouseDown={props.onHueMouseDown}>
      </S.HueCanvas>
    </S.CanvasContainer>
    <S.ChosenColorContainer>
      <S.ChosenColor chosenColor={props.chosenColor}></S.ChosenColor>
    </S.ChosenColorContainer>
  </S.ColorPicker>
);

export default ColorPicker;
