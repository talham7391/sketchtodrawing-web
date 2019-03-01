import styled from 'styled-components';

export const App = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr auto;
`;

export const CanvasContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UploadImage = styled.div`
  display: grid;
  justify-items: center;

  p {
    margin: 20px;
  }

  input {
    display: none;
  }
`;

export const Canvas = styled.canvas`
  display: ${props => props.show ? 'block' : 'none'}
`;

export const Steps = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 20px;
`;