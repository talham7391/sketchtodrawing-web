import styled from 'styled-components';

export const SmallIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 22px;
  height: 22px;
  background-color: #1c73ff;
  color: white;
  font-size: 16px;
  border-radius: 7px;
  border: none;
  transition: 0.1s all;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #0b48aa;
  }

  &:active {
    background-color: #5495ff;
  }
`;
