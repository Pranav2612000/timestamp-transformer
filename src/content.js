import { isTimestamp, transformTimestamp } from "./service/Timestamp";
import { wrapTextInSpanElement, getTimestampElement } from "./service/DOM";

function loadEventHandlers() {
  console.log("Load event handlers for handling events using delegation");
}

function loadContentScript() {
  console.log("Content script loaded");
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
        const timestamp = isTimestamp(word);
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
          element.replaceChild(wrapTextInSpanElement(formattedHTML), node);
        }
      });
    });
  });
}

loadEventHandlers();
loadContentScript();
