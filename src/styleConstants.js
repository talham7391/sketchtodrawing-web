
export const PRIMARY_COLOR = '#369df5';
export const PRIMARY_HOVER_COLOR = '#6abaff';
export const PRIMARY_ACTIVE_COLOR = '#3b69b5';
export const DISABLED_COLOR = '#e4e4e4';
export const SECONDARY_COLOR = '#ffac30';
export const SECONDARY_HOVER_COLOR = '#d47f00';
export const SECONDARY_ACTIVE_COLOR = '#ffc978';
export const BASIC_COLOR = '#f5f5f5';
export const BASIC_HOVER_COLOR = '#dedede';
export const BASIC_ACTIVE_COLOR = '#ececec';

export const TYPE = {
  PRIMARY: 0,
  SECONDARY: 1,
  BASIC: 2,
};

export const STATE = {
  NORMAL: 0,
  HOVER: 1,
  ACTIVE: 2,
};

export function getColor(type, state, isDisabled) {
  if (isDisabled) {
    return DISABLED_COLOR;
  }
  if (type == null || type === TYPE.PRIMARY) {
    switch (state) {
      case STATE.NORMAL:
        return PRIMARY_COLOR;
      case STATE.HOVER:
        return PRIMARY_HOVER_COLOR;
      case STATE.ACTIVE:
        return PRIMARY_ACTIVE_COLOR;
      case STATE.DISABLED:
        return DISABLED_COLOR;
      default:
        return null;
    }
  }
  else if (type === TYPE.SECONDARY ) {
    switch (state) {
      case STATE.NORMAL:
        return SECONDARY_COLOR;
      case STATE.HOVER:
        return SECONDARY_HOVER_COLOR;
      case STATE.ACTIVE:
        return SECONDARY_ACTIVE_COLOR;
      case STATE.DISABLED:
        return DISABLED_COLOR;
      default:
        return null;
    }
  }
  else if (type === TYPE.BASIC) {
    switch (state) {
      case STATE.NORMAL:
        return BASIC_COLOR;
      case STATE.HOVER:
        return BASIC_HOVER_COLOR;
      case STATE.ACTIVE:
        return BASIC_ACTIVE_COLOR;
      case STATE.DISABLED:
        return DISABLED_COLOR;
      default:
        return null;
    }
  }
}

export function getTextColor(type, state, isDisabled) {
  if (isDisabled) {
    return 'white';
  } else {
    if (type === TYPE.BASIC) {
      return 'black';
    } else {
      return 'white';
    }
  }
}