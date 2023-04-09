import { isTimestamp } from "./service/Timestamp";

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
        if (isTimestamp(word)) {
          console.log(word);
        }
      });
    });
  });
}

loadContentScript();
