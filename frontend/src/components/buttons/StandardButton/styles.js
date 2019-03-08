import styled from 'styled-components';
import * as gs from '../../../styleConstants.js';

export const StandardButton = styled.button`
  background-color: ${props => gs.getColor(props.type, gs.STATE.NORMAL, props.isDisabled)};
  color: white;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 7px;
  border: none;
  transition: 0.1s all;
  cursor: pointer;
  pointer-events: ${props => props.isDisabled ? 'none' : 'all'}

  &:hover {
    background-color: ${props => gs.getColor(props.type, gs.STATE.HOVER, props.isDisabled)};
  }

  &:active {
    background-color: ${props => gs.getColor(props.type, gs.STATE.ACTIVE, props.isDisabled)};
  }
`;
