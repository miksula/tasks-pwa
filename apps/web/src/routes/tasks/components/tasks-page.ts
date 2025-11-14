import { html, LitElement } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { NoShadow } from "@/shared/mixins/no-shadow.ts";
import { type State } from "@/shared/types.ts";
import { dispatchEvent } from "@/shared/store.ts";

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

  override firstUpdated() {
    this.input = this.querySelector("input");
  }

  keyboardAction(event: KeyboardEvent) {
    switch (event.key) {
      case "Enter":
        this.saveTask(event);
        break;
      case "Escape":
        this.clear();
        break;
    }
  }

  saveTask(e: Event) {
    e.preventDefault();
    if (this.input) {
      const text = this.input.value.trim();
      if (!text) {
        return;
      }
      this.input.value = "";
      this.input.focus();
      dispatchEvent(this, { type: "ADD", text });
    }
  }

  clear() {
    if (this.input) {
      this.input.value = "";
      this.input.blur();
    }
  }

  override render() {
    return html`
      <div>
        <h1>Tasks</h1>
        <p>List of tasks will be displayed here.</p>
        <div>
          <input
            type="text"
            placeholder="New task"
            id="new-task-input"
            @keyup="${this.keyboardAction}"
          />
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
