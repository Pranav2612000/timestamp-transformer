/* global chrome */
import {
  updateBadgeText,
  removeAllContextMenus,
  addContextMenus,
  updateContextMenu,
  setValueInChromeStorage,
  getValueFromChromeStorage,
} from "./service/Extension";

const toggleAppState = async (oldState) => {
  // fetch the current app state if it isn't passed
  let enabled = oldState;
  if (enabled === undefined || enabled === null) {
    enabled = await getValueFromChromeStorage("enabled");
  }

  // toggle the state
  enabled = !enabled;

  // update and redraw the contextMenus
  await Promise.all([
    updateContextMenu("ON", { visible: !enabled, enabled: !enabled }),
    updateContextMenu("OFF", { visible: enabled, enabled }),
  ]);

  // finally, update the state in chrome storage
  setValueInChromeStorage("enabled", enabled);
};

const startApp = async () => {
  // toggle the app enabled state
  await toggleAppState(false);

  // actions to perform for starting the app
  await updateBadgeText("ON");

  console.log("App started successfully");
};

const stopApp = async () => {
  // toggle the app enabled state
  await toggleAppState(true);

  // actions to perform for stoping the app
  await updateBadgeText("OFF");

  console.log("App stopped successfully");
};

const initializeContextMenus = async (isAppEnabled) => {
  await removeAllContextMenus();
  await addContextMenus([
    {
      title: "Switch ON",
      id: "ON",
      visible: !isAppEnabled,
      enabled: !isAppEnabled,
    },
    {
      title: "Switch OFF",
      id: "OFF",
      visible: isAppEnabled,
      enabled: isAppEnabled,
    },
  ]);

  chrome.contextMenus.onClicked.addListener((info) => {
    switch (info.menuItemId) {
      case "OFF":
        stopApp();
        break;
      case "ON":
        startApp();
        break;
      default:
        break;
    }
  });

  console.log("Context Menus created successfully");
};

const initializeApp = async () => {
  console.log("Starting background service...");

  // fetch the current app state
  let enabled = await getValueFromChromeStorage("enabled");

  // if enabled is not defined ( first time after installing the app )
  // we set it to true by default
  if (enabled === undefined) {
    await setValueInChromeStorage("enabled", true);
    enabled = true;
  }

  await initializeContextMenus(enabled);

  // We do nothing if the app is in OFF state
  if (enabled === false) {
    await stopApp();
    return;
  }

  // otherwise
  await startApp();
};

initializeApp();
