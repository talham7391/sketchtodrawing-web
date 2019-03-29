import styled from 'styled-components';
import * as gs from '../../../styleConstants.js';

export const StandardButton = styled.button`
  background-color: ${props => gs.getColor(props.type, gs.STATE.NORMAL, props.isDisabled)};
  color: ${props => gs.getTextColor(props.type, gs.STATE.NORMAL, props.isDisabled)};
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 7px;
  border: none;
  transition: 0.1s all;
  cursor: pointer;
  pointer-events: ${props => props.isDisabled ? 'none' : 'all'};
  outline: none;
  opacity: 1;

  &:hover {
    background-color: ${props => gs.getColor(props.type, gs.STATE.HOVER, props.isDisabled)};
  }

  &:active {
    background-color: ${props => gs.getColor(props.type, gs.STATE.ACTIVE, props.isDisabled)};
  }
`;
