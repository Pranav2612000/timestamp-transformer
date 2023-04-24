function _validateDateFormat(format) {
  /* Assume all formats are valid for now */
  if (!format) {
    return false;
  }
  return true;
}

function _formatDate(timestamp, format) {
  if (!format) {
    return new Date(timestamp).toLocaleString();
  }

  if (!_validateDateFormat) {
    throw new Error("Unknown format");
  }
  throw new Error("Format Date operation failed");
}

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

export function transformTimestamp(timestamp, limits) {
  if (is10DigitTimestamp(timestamp, limits)) {
    return _formatDate(timestamp * 1000);
  }

  return _formatDate(timestamp);
}
