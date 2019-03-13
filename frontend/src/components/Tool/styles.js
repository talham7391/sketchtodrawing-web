import styled from 'styled-components';

export const Tool = styled.img`
  padding: 8px;
  cursor: pointer;
  height: 24px;
  opacity: ${props => props.selected ? '1' : '0.2'};
  transition: all 0.2s;

  &:hover {
    opacity: ${props => props.selected ? '1' : '0.5'};
  }
`;