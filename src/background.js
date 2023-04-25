import { removeAllContextMenus, addContextMenus } from "./service/Extension";

const initializeContextMenus = async () => {
  await removeAllContextMenus();
  await addContextMenus([
    {
      title: "Undo all transforms",
      id: "UNDO_ALL",
    },
  ]);

  console.log("Context Menus created successfully");
};

const initializeApp = async () => {
  console.log("Starting background service...");

  await initializeContextMenus();
};

initializeApp();
