import { isTimestamp, transformTimestamp } from "./service/Timestamp";
import {
  createEventListeners,
  wrapTextInSpanElement,
  getTimestampElement,
} from "./service/DOM";

function loadEventHandlers() {
  console.log("Load event handlers for handling events using delegation");
  createEventListeners();
}

function loadContentScript() {
  console.log("Content script loaded");

  const limits = {
    MIN_TIMESTAMP: 1420050600000,
    MAX_TIMESTAMP: 1893436200000,
  };

  const elements = Array.from(document.getElementsByTagName("*"));

  elements.forEach((element) => {
    const { childNodes } = element;

    childNodes.forEach((node) => {
      if (node.nodeType !== 3) {
        return;
      }
      const text = node.nodeValue;
      const words = text.replace(/\n/g, " ").split(" ");

      words.forEach((word) => {
        const timestamp = isTimestamp(word, limits);
        if (timestamp) {
          const transformedTimestamp = transformTimestamp(timestamp);
          const transformedTimestampElement = getTimestampElement(
            transformedTimestamp,
            timestamp
          );
          const regex = new RegExp(`${word}`, "gi");
          const formattedHTML = text.replace(
            regex,
            transformedTimestampElement
          );
          element.replaceChild(
            wrapTextInSpanElement(formattedHTML, {
              dataset: { originalText: text },
            }),
            node
          );
        }
      });
    });
  });

  loadEventHandlers();
}

loadEventHandlers();
loadContentScript();
