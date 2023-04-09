const MIN_TIMESTAMP = 1420050600000;
const MAX_TIMESTAMP = 1893436200000;

export function isTimestamp(string) {
  const timestamp = parseInt(string, 10);
  if (Number.isNaN(timestamp)) {
    return false;
  }

  if (!(MIN_TIMESTAMP <= timestamp && timestamp <= MAX_TIMESTAMP)) {
    return false;
  }

  return true;
}

export function transformTimestamp(timestamp) {
  return new Date(timestamp).toLocaleString();
}
