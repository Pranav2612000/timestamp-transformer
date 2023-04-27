/* global chrome */
import { isTimestamp, transformTimestamp } from "./service/Timestamp";
import {
  getValueFromChromeStorage,
  setValueInChromeStorage,
} from "./service/Extension";
import {
  TT_CONTAINER_CLASS,
  createEventListeners,
  wrapTextInSpanElement,
  revertTimestampElementChange,
  getTimestampElement,
} from "./service/DOM";

const DEFAULT_MIN_TIMESTAMP = 1420050600000;
const DEFAULT_MAX_TIMESTAMP = 1893436200000;
const DEFAULT_DATE_FORMAT = "DD/MM/YYYY hh:mm:ss";

async function isExtensionEnabledForThisSite() {
  const storedSettings = await getValueFromChromeStorage("settings");
  const blacklistedSitesString = storedSettings?.blacklistedSites ?? "";

  const currentUrl = window.location.href;

  if (blacklistedSites.includes(currentUrl)) {
    return false;
  }
  return true;
}

async function disableExtensionForThisSite() {
  let storedSettings = await getValueFromChromeStorage("settings");

  if (!storedSettings) {
    storedSettings = {};
  }

  const { blacklistedSites: blacklistedSitesString = "" } = storedSettings;

  const currentUrl = window.location.href;

  if (blacklistedSites.includes(currentUrl)) {
    console.log("Site already blacklisted. Not blacklisting it again");
    return;
  }

  blacklistedSites.push(currentUrl);
  storedSettings.blacklistedSites = blacklistedSites;
  await setValueInChromeStorage("settings", storedSettings);
}

function undoAllTransforms() {
  console.log("Undoing all transforms");

  const elements = Array.from(document.getElementsByTagName("*"));

  elements.forEach((element) => {
    const { childNodes } = element;

    childNodes.forEach((node) => {
      if (node.nodeType !== 1) {
        return;
      }

      if (!node.classList) {
        return;
      }

      if (!Array.from(node.classList).includes(TT_CONTAINER_CLASS)) {
        return;
      }
      revertTimestampElementChange(node);
    });
  });
}

async function transformAll() {
  const isExtensionEnabled = await isExtensionEnabledForThisSite();
  if (!isExtensionEnabled) {
    console.log("Extension not enabled for this site. Exiting...");
    console.log("You can go to Extension Options to enable it again");
    return;
  }
  const storedSettings = await getValueFromChromeStorage("settings");
  const limits = {
    MIN_TIMESTAMP: storedSettings?.startDate
      ? new Date(storedSettings.startDate).getTime()
      : DEFAULT_MIN_TIMESTAMP,
    MAX_TIMESTAMP: storedSettings?.endDate
      ? new Date(storedSettings.endDate).getTime()
      : DEFAULT_MAX_TIMESTAMP,
  };
  const format = storedSettings?.format ?? DEFAULT_DATE_FORMAT;

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
}

function loadEventHandlers() {
  console.log("Load event handlers for handling events using delegation");
  createEventListeners();
}

async function loadContentScript() {
  console.log("Content script loaded");
  transformAll();

  loadEventHandlers();
}

const loadMessageHandlers = () => {
  chrome.runtime.onMessage.addListener(function (request) {
    switch (request.operation) {
      case "UNDO_ALL": {
        undoAllTransforms();
        break;
      }

      case "TRANSFORM_ALL": {
        transformAll();
        break;
      }

      case "DISABLE_FOR_THIS_SITE": {
        disableExtensionForThisSite();
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
