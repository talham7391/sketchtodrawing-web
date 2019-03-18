import styled from 'styled-components';

const margin = '6px';

export const ToolBox = styled.div`
  display: flex;
  margin-top: -${margin};
  margin-left: -${margin};

  > * {
    margin-top: ${margin};
    margin-left: ${margin};
  }
`;
