import { html, LitElement } from "lit";
import { NoShadow } from "@/shared/mixins/no-shadow.ts";

export default class TasksPage extends NoShadow(LitElement) {
  override render() {
    return html`
      <div>
        <h1>Tasks</h1>
        <p>List of tasks will be displayed here.</p>
      </div>
    `;
  }
}

customElements.define("tasks-page", TasksPage);
