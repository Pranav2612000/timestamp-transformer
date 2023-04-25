const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const formatSpecifiers = [
  { pattern: "DD", extractor: (date) => date.getDate() },
  { pattern: "DDD", extractor: (date) => daysOfTheWeek[date.getDay()] },
  { pattern: "MM", extractor: (date) => date.getMonth() + 1 },
  { pattern: "YYYY", extractor: (date) => date.getFullYear() },
  { pattern: "YY", extractor: (date) => date.getFullYear() % 100 },
  { pattern: "hh", extractor: (date) => date.getHours() },
  { pattern: "mm", extractor: (date) => date.getMinutes() },
  { pattern: "ss", extractor: (date) => date.getSeconds() },
];

export function validateDateFormat(format) {
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

  if (!validateDateFormat) {
    throw new Error("Unknown format");
  }
  const date = new Date(timestamp);
  const dateString = formatSpecifiers.reduce((acc, curVal) => {
    return acc.replaceAll(curVal.pattern, curVal.extractor(date));
  }, format);

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
