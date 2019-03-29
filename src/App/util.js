export const STAGES = {
  UPLOAD: 0,
  DRAWING: 1,
};

const state = {
  shiftKeyDown: false,
};

export function isShiftKeyDown() {
  return state.shiftKeyDown;
}

function handleKeyDown(evt) {
  if (evt.keyCode === 16) { // shift
    state.shiftKeyDown = true;
  }
}

function handleKeyUp(evt) {
  if (evt.keyCode === 16) { // shift
    state.shiftKeyDown = false;
  }
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);