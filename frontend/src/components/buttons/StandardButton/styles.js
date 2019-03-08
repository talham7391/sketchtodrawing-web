import styled from 'styled-components';
import * as gs from '../../../styleConstants.js';

export const StandardButton = styled.button`
  background-color: ${props => props.isDisabled ? gs.DISABLED_GREY : gs.PRIMARY_BLUE};
  color: white;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 7px;
  border: none;
  transition: 0.1s all;
  cursor: pointer;
  pointer-events: ${props => props.isDisabled ? 'none' : 'all'}

  &:hover {
    background-color: ${props => props.isDisabled ? gs.DISABLED_GREY : gs.HOVER_BLUE};
  }

  &:active {
    background-color: ${props => props.isDisabled ? gs.DISABLED_GREY : gs.ACTIVE_BLUE};
  }
`;
