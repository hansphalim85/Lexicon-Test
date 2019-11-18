export function reachable(distance, ability) {
  if (ability >= distance) {
    return true;
  } else {
    return false;
  }
}

export function isAvailable(stock) {
  if (stock > 0) {
    return true;
  } else {
    return false;
  }
}

export function notEmpty(item) {
    if (typeof item !== 'undefined' && item !== '') {
        return true;
    } else {
        return false;
    }
}

export function getTimeTaken(distance, speed) {
  return distance / speed;
}
