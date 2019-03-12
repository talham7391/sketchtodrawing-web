import styled from 'styled-components';

export const ToolBar = styled.div`
  background-color: white;
  display: flex;
`;

export const Tool = styled.div`
  padding: 10px;
  background-color: ${props => props.selected ? '#ececec' : 'white'};
  cursor: pointer;
`;