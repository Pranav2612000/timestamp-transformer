/* global chrome */
import { isTimestamp, transformTimestamp } from "./service/Timestamp";
import { getValueFromChromeStorage } from "./service/Extension";
import {
  createEventListeners,
  wrapTextInSpanElement,
  getTimestampElement,
} from "./service/DOM";

function undoAllTransforms() {
  console.log("Undoing all transforms");
}

function loadEventHandlers() {
  console.log("Load event handlers for handling events using delegation");
  createEventListeners();
}

async function loadContentScript() {
  console.log("Content script loaded");

  const storedSettings = await getValueFromChromeStorage("settings");
  const limits = {
    MIN_TIMESTAMP: new Date(storedSettings.startDate).getTime(),
    MAX_TIMESTAMP: new Date(storedSettings.endDate).getTime(),
  };
  const { format } = storedSettings;

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
          const transformedTimestamp = transformTimestamp(
            timestamp,
            limits,
            format
          );
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

const loadMessageHandlers = () => {
  chrome.runtime.onMessage.addListener(function (request) {
    switch (request.operation) {
      case "UNDO_ALL": {
        undoAllTransforms();
        break;
      }

      default:
        break;
    }
  });
};

loadEventHandlers();
loadContentScript();
loadMessageHandlers();
