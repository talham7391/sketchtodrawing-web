import styled from 'styled-components';

const radius = '10px';

export const ColorPicker = styled.div`
  display: flex;
`;

export const CanvasContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const ColorCanvas = styled.canvas`
  width: 200px;
  height: 150px;
  cursor: pointer;
  border-top-left-radius: ${radius};
  border-top-right-radius: ${radius};
`;

export const HueCanvas = styled.canvas`
  height: 20px;
  width: 200px;
  border-bottom-left-radius: ${radius};
  border-bottom-right-radius: ${radius};
`;

export const ChosenColorContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChosenColor = styled.div.attrs(props => ({
  style: {
    backgroundColor: `rgba(${props.chosenColor.r}, ${props.chosenColor.g}, ${props.chosenColor.b}, ${props.chosenColor.a})`,
  },
}))`
  width: 50px;
  height: 50px;
  border-radius: 100%;
`;