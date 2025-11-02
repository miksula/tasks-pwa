import { html, LitElement } from "lit";

export default class TasksPage extends LitElement {
  render() {
    return html`
      <div>
        <h1>Tasks</h1>
        <p>List of tasks will be displayed here.</p>
      </div>
    `;
  }
}

customElements.define("tasks-page", TasksPage);
