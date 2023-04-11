export function createSpanElement(text) {
  const element = document.createElement("span");
  element.innerHTML = text;
  return element;
}

export function wrapTextInSpanElement(text) {
  const wrapper = createSpanElement(text);
  return wrapper;
}

export function getTimestampElement(timestamp) {
  const timestampElement = wrapTextInSpanElement(timestamp);
  return timestampElement.outerHTML;
}
