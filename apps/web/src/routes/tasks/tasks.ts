import { html } from "lit";
import { State } from "@/shared/types.ts";
import "./tasks-page.ts";

export function Tasks(data: State) {
  return html`
    <tasks-page .data="${data}"></tasks-page>
  `;
}
