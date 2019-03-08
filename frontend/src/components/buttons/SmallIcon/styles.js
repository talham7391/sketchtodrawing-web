import styled from 'styled-components';
import * as gs from '../../../styleConstants.js';

export const SmallIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 22px;
  height: 22px;
  background-color: ${props => props.isDisabled ? gs.DISABLED_GREY : gs.PRIMARY_BLUE};
  color: white;
  font-size: 16px;
  border-radius: 7px;
  border: none;
  transition: 0.1s all;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: ${props => props.isDisabled ? gs.DISABLED_GREY : gs.HOVER_BLUE};
  }

  &:active {
    background-color: ${props => props.isDisabled ? gs.DISABLED_GREY : gs.ACTIVE_BLUE};
  }
`;
