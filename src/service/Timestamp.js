export function is13DigitTimestamp(timestamp, limits) {
  const { MIN_TIMESTAMP, MAX_TIMESTAMP } = limits;
  if (!(MIN_TIMESTAMP <= timestamp && timestamp <= MAX_TIMESTAMP)) {
    return false;
  }
  return true;
}

export function is10DigitTimestamp(timestamp, limits) {
  const { MIN_TIMESTAMP, MAX_TIMESTAMP } = limits;
  timestamp *= 1000;
  if (!(MIN_TIMESTAMP <= timestamp && timestamp <= MAX_TIMESTAMP)) {
    return false;
  }
  return true;
}

export function isTimestamp(string, limits) {
  const timestamp = parseInt(string, 10);
  if (Number.isNaN(timestamp)) {
    return false;
  }

  if (
    !is13DigitTimestamp(timestamp, limits) &&
    !is10DigitTimestamp(timestamp, limits)
  ) {
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
