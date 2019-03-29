import styled from 'styled-components';
import * as gs from '../../../styleConstants.js';

const dotSize = '12px';

export const ContinuousSlider = styled.div`
  position: relative;
  height: ${dotSize};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Base = styled.div`
  background-color: rgba(0, 0, 0, 0.06);
  height: 4px;
  flex-grow: 1;
`;

export const Dot = styled.div.attrs(props => ({
  style: {
    left: `${props.left}%`,
  },
}))`
  background-color: ${props => props.isDisabled ? gs.DISABLED_COLOR : gs.PRIMARY_COLOR};
  width: ${dotSize};
  height: ${dotSize};
  border-radius: 100%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`;