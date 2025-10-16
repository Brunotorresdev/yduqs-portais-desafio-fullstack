/// <reference types="node" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

export interface DOMElement extends HTMLElement {
  value: string;
}
