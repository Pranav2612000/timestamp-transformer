const TT_CONTAINER_CLASS = "tt-container";
const TT_TOOLTIP_CLASS = "tt-tooltip";
const TT_CLEAR_TOOLTIP_CLASS = "tt-clear-tooltip";

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
  element.className = TT_CONTAINER_CLASS;

  element.style.border = "1px dotted chocolate";
  element.style.position = "relative";
}

export function addTooltipToElement(element, tooltipText) {
  const clearInstructionElement = wrapTextInSpanElement(
    "Click to revert change",
    { className: TT_CLEAR_TOOLTIP_CLASS }
  );
  const tooltipElement = wrapTextInSpanElement(
    tooltipText + clearInstructionElement.outerHTML,
    {
      className: TT_TOOLTIP_CLASS,
    }
  );
  element.innerHTML = `${element.innerHTML}${tooltipElement.outerHTML}`;
}

export function createTooltipElementClickListener() {
  document.querySelectorAll(`.${TT_TOOLTIP_CLASS}`).forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.stopPropagation();
      alert("clicked");
    });
  });
}

export function getTimestampElement(date, timestamp) {
  const timestampElement = wrapTextInSpanElement(date);
  styleTimestampElementWrapper(timestampElement);
  addTooltipToElement(timestampElement, timestamp);

  return timestampElement.outerHTML;
}

export function createEventListeners() {
  createTooltipElementClickListener();
}
