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
    margin-bottom: 8px;
  }

  > *:nth-child(2) {
    font-size: 14px;
    opacity: 0.7;
    margin-bottom: 16px;
  }
`;