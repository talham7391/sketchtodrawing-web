import styled from 'styled-components';
import * as gs from '../../../styleConstants.js';

export const DiscreteSlider = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 10px;
  align-items: center;
`;

export const Slider = styled.div`
  position: relative;
`;

export const Base = styled.div`
  background-color: rgba(0, 0, 0, 0.06);
  height: 4px;
`;

export const Dot = styled.div`
  background-color: ${props => props.isDisabled ? gs.DISABLED_COLOR : gs.PRIMARY_COLOR};
  width: 12px;
  height: 12px;
  border-radius: 100%;
  position: absolute;
  top: 50%;
  left: ${props => props.left}%;
  transform: translate(-50%, -50%);
`;