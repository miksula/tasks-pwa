import { html } from "lit";
import "./components/counter-element.ts";

export function Test() {
  return html`
    <div>Test</div>
    <counter-element></counter-element>
  `;
}
