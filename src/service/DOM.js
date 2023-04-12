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

export function addTooltipToElement(element, tooltipText) {
  const tooltipElement = wrapTextInSpanElement(tooltipText);
  console.log(tooltipElement);
  element.innerHTML = `${element.innerHTML}${tooltipElement.outerHTML}`;
}

export function getTimestampElement(date, timestamp) {
  const timestampElement = wrapTextInSpanElement(date);
  styleTimestampElementWrapper(timestampElement);
  addTooltipToElement(timestampElement, timestamp);

  return timestampElement.outerHTML;
}
