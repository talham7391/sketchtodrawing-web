import styled from 'styled-components';

const margin = '6px';

export const ToolBox = styled.div`
  
`;

export const Tools = styled.div`
  display: flex;
  margin-top: -${margin};
  margin-left: -${margin};

  > * {
    margin-top: ${margin};
    margin-left: ${margin};
  }
`;

export const Settings = styled.div`
  margin-top: 10px;

  > *:not(:first-child) {
    margin-top: 10px;
  }
`;

export const Setting = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  row-gap: 10px;

  > *:first-child {
    font-weight: bold;
    font-size: 16px;
  }
`;