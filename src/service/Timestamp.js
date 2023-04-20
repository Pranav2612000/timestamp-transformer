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
  const timestamp = parseInt(string, 10);
  if (Number.isNaN(timestamp)) {
    return false;
  }

  if (!is13DigitTimestamp(timestamp) && !is10DigitTimestamp(timestamp)) {
    return false;
  }

  return timestamp;
}

export function transformTimestamp(timestamp) {
  if (is10DigitTimestamp) {
    return new Date(timestamp * 1000).toLocaleString();
  }

  return new Date(timestamp).toLocaleString();
}
