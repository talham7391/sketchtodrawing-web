import styled from 'styled-components';

export const Layers = styled.div`
  font-size: 16px;
  display: grid;
  grid-template-rows: auto;
  row-gap: 12px;
`;

export const Layer = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr auto auto;
  padding: 0px 10px;
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

export const Eye = styled.img`
  width: 20px;
  opacity: ${props => props.isHidden ? '0.2' : '1'};
  cursor: pointer;
`;

export const Arrows = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  row-gap: 4px;

  > *:first-child {
    transform: rotate(180deg);
  }
`;