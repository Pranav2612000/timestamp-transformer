/* global chrome */

export const isExtension = process.env.REACT_APP_TYPE === "extension";

// Creates a async/await usable function to update badge text of the app
export async function updateBadgeText(text) {
  return new Promise((resolve) => {
    chrome.action.setBadgeText({ text }, () => {
      resolve(true);
    });
  });
}

export async function removeAllContextMenus() {
  return new Promise((resolve) => {
    chrome.contextMenus.removeAll(() => {
      resolve(true);
    });
  });
}

export async function addContextMenus(contextMenus) {
  return Promise.all(
    contextMenus.map((contextMenu) => {
      return new Promise((resolve) => {
        chrome.contextMenus.create(
          {
            title: contextMenu.title,
            id: contextMenu.id,
            contexts: contextMenu.contexts || ["all"],
            type: contextMenu.type || "normal",
            visible: contextMenu.visible,
            enabled: contextMenu.enabled,
          },
          () => {
            resolve(true);
          }
        );
      });
    })
  );
}

export async function updateContextMenu(id, properties) {
  return new Promise((resolve) => {
    chrome.contextMenus.update(id, properties, () => {
      resolve(true);
    });
  });
}

export async function setValueInChromeStorage(key, value) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: value }).then(() => {
      resolve(true);
    });
  });
}

export async function getValueFromChromeStorage(key) {
  return new Promise((resolve) => {
    chrome.storage.local.get([key]).then((result) => {
      resolve(result[key]);
    });
  });
}

export function connectBackgroundWithPopover(onConnect, onDisconnect) {
  const listener = (port) => {
    console.log("Connected to ", port.name);
    onConnect(port);

    port.onDisconnect.addListener((currentPort) => {
      console.log("Disconnected", currentPort.name);
      onDisconnect();
    });
  };

  chrome.runtime.onConnect.removeListener(listener);
  chrome.runtime.onConnect.addListener(listener);
}

export function connectPopoverWithBackground({ channel, onMessage }) {
  // create a runtime connection port to communicate with background.js script
  const port = chrome.runtime.connect({ name: channel });

  port.onMessage.addListener(function ({ type, data }) {
    onMessage(type, data);
  });

  return {
    closeConnection: () => {
      console.log("Closing open state update port");
      port.disconnect();
    },
  };
}

export async function sendMessageToBackground(message) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(message, (response) => {
      console.log("Response from text update", response);
      resolve(response);
    });
  });
}

export function listenForUpdatesFromPopup({ onUpdate } = {}) {
  function listener(message, sender, sendResponse) {
    console.log("Update received from popup", message);

    (async () => {
      try {
        onUpdate(message);
        sendResponse({ status: "SUCCESS" });
      } catch (err) {
        console.log(err);
      }
    })();
    return true;
  }

  chrome.runtime.onMessage.removeListener(listener);
  chrome.runtime.onMessage.addListener(listener);
}
