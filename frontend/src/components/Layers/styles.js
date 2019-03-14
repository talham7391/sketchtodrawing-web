import styled from 'styled-components';

export const Layers = styled.div`
  font-size: 16px;
  display: grid;
  grid-template-rows: auto;
  row-gap: 12px;
`;

export const Layer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  padding-right: 10px;
  column-gap: 18px;
  align-items: center;
  background-color: ${props => props.selected ? '#f5f5f5' : 'none'};
  font-weight: ${props => props.selected ? 'bold' : 'regular'};
  border-radius: 7px;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }

  > canvas {
    width: 50px;
    height: 50px;
  }
`;