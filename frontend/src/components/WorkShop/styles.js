import styled from 'styled-components';

export const WorkShop = styled.div`
  display: grid;
  grid-template-columns: 30% 1fr;
`;

export const Center = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Left = styled.div`
  background-color: white;
  padding: 14px 20px;
  display: grid;
  grid-template-rows: 1fr 2fr;
`;

export const LayersContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ScrollingWrapper = styled.div`
  margin-top: 10px;
  flex-grow: 1;
  position: relative;
  overflow: scroll;
`;

export const Layers = styled.div`
  position: absolute;
  width: 100%;
`;