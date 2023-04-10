import { isTimestamp, transformTimestamp } from "./service/Timestamp";

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
          const regex = new RegExp(`${word}`, "gi");
          const formattedWord = word.replace(regex, `${transformedTimestamp}`);
          console.log({ word, regex, formattedWord });
          element.replaceChild(document.createTextNode(formattedWord), node);
        }
      });
    });
  });
}

loadContentScript();
