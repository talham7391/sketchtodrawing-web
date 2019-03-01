import styled from 'styled-components';

export const StandardButton = styled.button`
  background-color: #1c73ff;
  color: white;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 7px;
  border: none;
  transition: 0.1s all;

  &:hover {
    background-color: #0b48aa;
  }

  &:active {
    background-color: #5495ff;
  }
`;
