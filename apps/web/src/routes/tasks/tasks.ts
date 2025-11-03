import { html } from "lit";
import "./tasks-page.ts";
import { State } from "../../shared/types.ts";

export function Tasks(data: State) {
  return html`
    <tasks-page .data="${data}"></tasks-page>
  `;
}
