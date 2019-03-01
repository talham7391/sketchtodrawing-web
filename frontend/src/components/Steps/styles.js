import styled from 'styled-components';

export const Steps = styled.div`
  display: flex;
  > *:not(:first-child) {
    margin-left: 40px;
  }
`;

export const Step = styled.div`
  display: grid;
  justify-items: center;
  row-gap: 10px;
`;

export const Dot = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => props.active ? '#1c73ff' : 'black'};
  opacity: ${props => props.active ? 1 : 0.2};
  transform: scale(${props => props.active ? 1 : 0.5});
  border-radius: 100%;
  transition: 0.2s all;
`;

export const Name = styled.div`
  color: ${props => props.active ? '#1c73ff' : 'black'};
  opacity: ${props => props.active ? 1 : 0.2};
`;