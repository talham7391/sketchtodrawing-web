import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`;

export const Container = styled.div.attrs(props => ({
  style: {
    left: props.brushOffset && props.brushOffset.x,
    top: props.brushOffset && props.brushOffset.y,
  },
}))`
  position: relative;
`;

export const Brush = styled.div.attrs(props => ({
  style: {
    width: `${props.size * 2}px`,
    height: `${props.size * 2}px`,
  },
}))`
  border: 1px solid black;
  border-radius: 100%;
`;

export const RopeBoundary = styled.div.attrs(props => ({
  style: {
    width: `${props.size * 2}px`,
    height: `${props.size * 2}px`,
  },
}))`
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Dot = styled.div`
  width: 5px;
  height: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: red;
  border-radius: 100%;
`;