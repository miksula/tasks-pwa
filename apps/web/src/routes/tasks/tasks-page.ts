import { html, LitElement } from "lit";
import { NoShadow } from "@/shared/mixins/no-shadow.ts";
import { State } from "@/shared/types.ts";

export default class TasksPage extends NoShadow(LitElement) {
  data: State;

  static override properties = {
    data: { attribute: false },
  };

  constructor() {
    super();
    this.data = {} as State;
  }

  override render() {
    console.log("TasksPage state:", this.data);
    return html`
      <div>
        <h1>Tasks</h1>
        <p>List of tasks will be displayed here.</p>
      </div>
    `;
  }
}

customElements.define("tasks-page", TasksPage);
