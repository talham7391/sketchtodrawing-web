import styled from 'styled-components';
import * as gs from '../../../styleConstants.js';

export const SmallIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 22px;
  height: 22px;
  background-color: ${props => gs.getColor(props.type, gs.STATE.NORMAL, props.isDisabled)};
  color: white;
  font-size: 16px;
  border-radius: 7px;
  border: none;
  transition: 0.1s all;
  cursor: pointer;
  pointer-events: ${props => props.isDisabled ? 'none' : 'all'};
  user-select: none;

  &:hover {
    background-color: ${props => gs.getColor(props.type, gs.STATE.HOVER, props.isDisabled)};
  }

  &:active {
    background-color: ${props => gs.getColor(props.type, gs.STATE.ACTIVE, props.isDisabled)};
  }
`;

export const JustIcon = styled.div`
  opacity: 0.2;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 1;
  }

  > img {
    ${props => props.imgWidth ? `width: ${props.imgWidth}px;` : ''}
    ${props => props.imgHeight ? `height: ${props.imgHeight}px;` : ''}
  }
`;
