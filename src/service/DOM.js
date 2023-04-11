export function createSpanElement(text) {
  const element = document.createElement("span");
  element.innerHTML = text;
  return element;
}

export function wrapTextInSpanElement(text) {
  return `<span>${text}</span>`;
}

export function getTimestampElement(timestamp) {
  return wrapTextInSpanElement(timestamp);
}
