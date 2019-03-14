import styled from 'styled-components';

export const LayeredCanvas = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

export const Canvas = styled.canvas.attrs(props => ({
  style: {
    transform: `translate(${props.translateX}%, ${props.translateY}%) scale(${props.scale})`,
    transformOrigin: `${-props.translateX}% ${-props.translateY}%`,
  },
}))`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: ${props => props.zIndex};
  pointer-events: ${props => props.selected ? 'all' : 'none'};
`;