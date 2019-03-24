import styled from 'styled-components';

export const CursorOverlay = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
`;

export const Cursor = styled.div.attrs(props => ({
  style: {
    left: `${props.mouseX}px`,
    top: `${props.mouseY}px`,
  },
}))`
  position: absolute;
  transform: translate(-50%, -50%);
`;