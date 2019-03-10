import styled from 'styled-components';

export const ImageUpload = styled.div`
  height: 100vh;
  display: flex;
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

export const Canvas = styled.div`
  display: ${props => props.show ? 'block' : 'none'}
  width: 100%;
  height: 100%;
`;

export const Steps = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 20px;
`;

export const MiddleContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
  flex-grow: 1;
`;

export const RightContainer = styled.div`
  background-color: white;
  width: 300px;
  padding: 14px 20px;
  display: grid;
  grid-template-rows: 1fr auto;
  
  > *:last-child {
    margin-bottom: 10px;
  }
`;