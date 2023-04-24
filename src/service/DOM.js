import Utils from "./Utils";

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
    // Since dataset is a read-only property,
    // we need to explicity set each value
    if (key === "dataset") {
      const dataAttributes = attributes[key];
      if (!Utils.isObject(dataAttributes)) {
        return;
      }

      Object.keys(dataAttributes).forEach((attr) => {
        wrapper[key][attr] = dataAttributes[attr];
      });
      return;
    }

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

export function getTimestampElement(date, timestamp) {
  const timestampElement = wrapTextInSpanElement(date, {
    dataset: { originalText: timestamp },
  });
  styleTimestampElementWrapper(timestampElement);
  addTooltipToElement(timestampElement, timestamp);

  return timestampElement.outerHTML;
}

export function revertTimestampElementChange(timestampElement) {
  const timestamp = timestampElement.dataset.originalText;

  timestampElement.replaceWith(timestamp);
}

export function createTooltipElementClickListener() {
  document.querySelectorAll(`.${TT_TOOLTIP_CLASS}`).forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.stopPropagation();

      let { parentElement } = e.target;
      if (e.target.className === TT_CLEAR_TOOLTIP_CLASS) {
        parentElement = e.target.parentElement.parentElement;
      }

      revertTimestampElementChange(parentElement);
    });
  });
}

export function createEventListeners() {
  createTooltipElementClickListener();
}
