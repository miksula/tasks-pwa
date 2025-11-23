import { html } from "lit";
// import "./components/counter-element.ts";
// import "./components/todo-list.ts";
// import ReactState from "./components/ReactState.ts";
import { TailwindElements } from "./components/TailwindElements.ts";

export function Test() {
  return html`
    <div>Test</div>
    <!-- <counter-element></counter-element> -->
    <!-- <todo-list></todo-list> -->
    ${TailwindElements()}
  `;
}
