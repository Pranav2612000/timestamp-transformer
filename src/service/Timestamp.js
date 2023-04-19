const MIN_TIMESTAMP = 1420050600000;
const MAX_TIMESTAMP = 1893436200000;

export function is13DigitTimestamp(timestamp) {
  if (!(MIN_TIMESTAMP <= timestamp && timestamp <= MAX_TIMESTAMP)) {
    return false;
  }
  return true;
}

export function is10DigitTimestamp(timestamp) {
  timestamp *= 1000;
  if (!(MIN_TIMESTAMP <= timestamp && timestamp <= MAX_TIMESTAMP)) {
    return false;
  }
  return true;
}

export function isTimestamp(string) {
  let timestamp = parseInt(string, 10);
  if (Number.isNaN(timestamp)) {
    return false;
  }

  /* To allow support for 10 digit timestamps */
  if (is10DigitTimestamp(timestamp)) {
    timestamp *= 1000;
  }

  if (!is13DigitTimestamp(timestamp)) {
    return false;
  }

  return timestamp;
}

export function transformTimestamp(timestamp) {
  return new Date(timestamp).toLocaleString();
}
