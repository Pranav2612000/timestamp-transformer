export default function createSpanElement(text) {
  const element = document.createElement("span");
  element.innerHTML = text;
  return element;
}
