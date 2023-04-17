export function createSpanElement(text) {
  const element = document.createElement("span");
  element.innerHTML = text;
  return element;
}

export function wrapTextInSpanElement(text, attributes = {}) {
  const wrapper = createSpanElement(text);

  Object.keys(attributes).forEach((key) => {
    wrapper[key] = attributes[key];
  });

  return wrapper;
}

export function styleTimestampElementWrapper(element) {
  element.className = "tt-container";

  element.style.border = "1px dotted chocolate";
  element.style.position = "relative";
}

export function addCrossIconElement() {
  return "<i>❌</i>";
}

export function addTooltipToElement(element, tooltipText) {
  const tooltipCrossIcon = addCrossIconElement();
  const tooltipElement = wrapTextInSpanElement(tooltipCrossIcon + tooltipText, {
    className: "tt-tooltip",
  });
  element.innerHTML = `${element.innerHTML}${tooltipElement.outerHTML}`;
}

export function getTimestampElement(date, timestamp) {
  const timestampElement = wrapTextInSpanElement(date);
  styleTimestampElementWrapper(timestampElement);
  addTooltipToElement(timestampElement, timestamp);

  return timestampElement.outerHTML;
}
