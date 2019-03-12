import styled from 'styled-components';

export const CleanTools = styled.div`
  > *:not(:first-child) {
    margin-top: 20px;
  }
`;

export const Tool = styled.div`
  display: flex;
  flex-direction: column;

  > :first-child {
    font-weight: bold;
    margin-bottom: 4px;
  }

  > *:nth-child(2) {
    font-size: 16px;
    margin-bottom: 16px;
  }
`;