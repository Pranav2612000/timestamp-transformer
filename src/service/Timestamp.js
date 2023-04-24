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
  const date = new Date(timestamp);
  const dateOfMonth = date.getDate();
  const month = date.getMonth() + 1; // 0-indexed
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  let dateString = format;
  dateString = dateString.replaceAll("DD", dateOfMonth);
  dateString = dateString.replaceAll("MM", month);
  dateString = dateString.replaceAll("YYYY", year);
  dateString = dateString.replaceAll("hh", hour);
  dateString = dateString.replaceAll("mm", minutes);
  dateString = dateString.replaceAll("ss", seconds);

  return dateString;
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

export function transformTimestamp(timestamp, limits, format) {
  if (is10DigitTimestamp(timestamp, limits)) {
    return _formatDate(timestamp * 1000, format);
  }

  return _formatDate(timestamp, format);
}
