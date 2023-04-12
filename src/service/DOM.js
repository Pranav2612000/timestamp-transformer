export function createSpanElement(text) {
  const element = document.createElement("span");
  element.innerHTML = text;
  return element;
}

export function wrapTextInSpanElement(text) {
  const wrapper = createSpanElement(text);
  return wrapper;
}

export function styleTimestampElementWrapper(element) {
  element.className = "tt-container";

  element.style.border = "1px dotted chocolate";
}

export function getTimestampElement(timestamp) {
  const timestampElement = wrapTextInSpanElement(timestamp);
  styleTimestampElementWrapper(timestampElement);

  return timestampElement.outerHTML;
}
