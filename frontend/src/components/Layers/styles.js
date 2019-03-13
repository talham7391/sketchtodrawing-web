import styled from 'styled-components';

export const Layers = styled.div`
  font-size: 16px;
  display: grid;
  grid-template-rows: auto;
  row-gap: 12px;
`;

export const Layer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 18px;
  align-items: center;

  > canvas {
    width: 50px;
    height: 50px;
    background-color: black;
  }
`;