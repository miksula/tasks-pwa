import { html, LitElement } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { NoShadow } from "@/shared/mixins/no-shadow.ts";
import { State } from "@/shared/types.ts";

export default class TasksPage extends NoShadow(LitElement) {
  input: HTMLInputElement | null = null;
  data: State;

  static override properties = {
    data: { attribute: false },
  };

  constructor() {
    super();
    this.data = {} as State;
  }

  protected override firstUpdated() {
    this.input = this.querySelector("input");
  }

  saveTask(e: UIEvent) {
    console.log(this.input?.value);
  }

  override render() {
    return html`
      <div>
        <h1>Tasks</h1>
        <p>List of tasks will be displayed here.</p>
        <div>
          <input type="text" placeholder="New task" id="new-task-input" />
          <button @click="${this.saveTask}">Add Task</button>
        </div>
        <ul>
          ${repeat(
            this.data.items,
            (item) => item.id,
            (item) =>
              html`
                <li>${item.text}</li>
              `,
          )}
        </ul>
      </div>
    `;
  }
}

customElements.define("tasks-page", TasksPage);
