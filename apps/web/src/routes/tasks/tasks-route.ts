import { html, LitElement } from "lit";

import type { State } from "../../lib/types.ts";

import { TasksList } from "./tasks-list.ts";

export class TasksRoute extends LitElement {
  declare data: State;

  static properties = { data: { type: Object } };

  protected createRenderRoot() {
    return this; // will render the template without shadow DOM
  }

  protected render() {
    return html`
      <div>${TasksList(this.data)}</div>
    `;
  }
}

customElements.define("tasks-route", TasksRoute);
