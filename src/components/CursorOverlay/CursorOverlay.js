import React from 'react';
import * as S from './styles.js';
import { observer } from 'mobx-react';

const CursorOverlay = observer(props => (
  <S.CursorOverlay>
    { props.cursorState.render && props.cursorState.comp &&
      <S.Cursor
        mouseX={props.cursorState.mouseX}
        mouseY={props.cursorState.mouseY}>
        <props.cursorState.comp {...props.cursorState.props}/>
      </S.Cursor>
    }
  </S.CursorOverlay>
));

export default CursorOverlay;
