export function setMaxToNKeepingRatio (n, a, b) {
  let na = null;
  let nb = null;
  if (a > b) {
    na = n;
    nb = n * b / a;
  } else {
    na = n * a / b;
    nb = n;
  }
  return [na, nb]
}

export function decreaseRangeFromBelow (r, g, b, by) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const oldRange = max - min;
  let newRange = oldRange - by;
  if (newRange <= 0) {
    newRange = 0;
    by = oldRange;
  }
  const changeVal = x => {
    if (x === max) {
      return x;
    } else if (x === min) {
      return x + by;
    } else {
      return max - (max - x) / oldRange * newRange;
    }
  };
  return {
    r: changeVal(r),
    g: changeVal(g),
    b: changeVal(b),
  }
}

export function scale (r, g, b, by) {
  const max = Math.max(r, g, b);
  return {
    r: (r / max) * (max * by),
    g: (g / max) * (max * by),
    b: (b / max) * (max * by),
  }
}

export function getRGB (hue, saturation, value) {
  hue = hue % 360;
  const percentRed = (120 - Math.abs(hue - Math.round(hue / 360) * 360)) / 120;
  const percentGreen = (120 - Math.abs(120 - hue)) / 120;
  const percentBlue = (120 - Math.abs(240 - hue)) / 120;
  if (0 <= hue && hue <= 120) {
    const ratio = setMaxToNKeepingRatio(255, percentRed, percentGreen);
    const rgb = decreaseRangeFromBelow(ratio[0], ratio[1], 0, 255 - saturation * 255);
    return scale(rgb.r, rgb.g, rgb.b, value);
  } else if (120 <= hue && hue <= 240) {
    const ratio = setMaxToNKeepingRatio(255, percentGreen, percentBlue);
    const rgb = decreaseRangeFromBelow(0, ratio[0], ratio[1], 255 - saturation * 255);
    return scale(rgb.r, rgb.g, rgb.b, value);
  } else {
    const ratio = setMaxToNKeepingRatio(255, percentRed, percentBlue);
    const rgb = decreaseRangeFromBelow(ratio[0], 0, ratio[1], 255 - saturation * 255);
    return scale(rgb.r, rgb.g, rgb.b, value);
  }
}

export function restrict(lb, val, up) {
  if (val < lb) {
    return lb;
  } else if (val > up) {
    return up;
  } else {
    return val;
  }
};