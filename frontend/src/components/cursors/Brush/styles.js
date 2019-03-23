import styled from 'styled-components';

export const Brush = styled.div.attrs(props => ({
  style: {
    width: `${props.size * 2}px`,
    height: `${props.size * 2}px`,
  },
}))`
  border: 1px solid black;
  border-radius: 100%;
`;
