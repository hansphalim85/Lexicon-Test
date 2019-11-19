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

export async function callFetch(url, method, request = false) {
    let input = {
      method: method,
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      }
    };

    if (request !== false) {
      input = Object.assign(input, {body: JSON.stringify(request)});
    }

    const response = await fetch(url, input);

    const json = await response.json();
    return json;
}
