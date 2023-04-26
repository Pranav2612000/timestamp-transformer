/* global chrome */
import { removeAllContextMenus, addContextMenus } from "./service/Extension";

const initializeContextMenus = async () => {
  await removeAllContextMenus();
  await addContextMenus([
    {
      title: "Undo all transforms",
      id: "UNDO_ALL",
    },
    {
      title: "(Re)Transform all on page",
      id: "TRANSFORM_ALL",
    },
    {
      title: "Disable extension for this site",
      id: "DISABLE_FOR_THIS_SITE",
    },
  ]);

  chrome.contextMenus.onClicked.addListener(async (info) => {
    switch (info.menuItemId) {
      case "UNDO_ALL": {
        const queryOptions = { active: true, currentWindow: true };

        const tabs = await chrome.tabs.query(queryOptions);
        chrome.tabs.sendMessage(tabs[0].id, { operation: "UNDO_ALL" });
        break;
      }
      case "TRANSFORM_ALL": {
        const queryOptions = { active: true, currentWindow: true };

        const tabs = await chrome.tabs.query(queryOptions);
        chrome.tabs.sendMessage(tabs[0].id, { operation: "TRANSFORM_ALL" });
        break;
      }
      case "DISABLE_FOR_THIS_SITE": {
        const queryOptions = { active: true, currentWindow: true };

        const tabs = await chrome.tabs.query(queryOptions);
        chrome.tabs.sendMessage(tabs[0].id, {
          operation: "DISABLE_FOR_THIS_SITE",
        });
        break;
      }

      default:
        break;
    }
  });

  console.log("Context Menus created successfully");
};

const initializeApp = async () => {
  console.log("Starting background service...");

  await initializeContextMenus();
};

initializeApp();
