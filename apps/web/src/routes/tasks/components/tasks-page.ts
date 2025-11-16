import { html, LitElement } from "lit";
import { repeat } from "lit/directives/repeat.js";
import type { State, TodoItem } from "@/shared/types.ts";
import { dispatchEvent } from "@/shared/store.ts";
import "./task-item.ts";

const props = {
  data: {},
};

export default class TasksPage extends LitElement {
  static override properties = props;

  /** The application state. */
  declare public data: State;

  private input?: HTMLInputElement;

  override firstUpdated() {
    this.input = this.renderRoot?.querySelector("input") || undefined;
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
            (item: TodoItem) => item.id,
            (item) =>
              html`
                <task-item .item="${item}"></task-item>
              `,
          )}
        </ul>
      </div>
    `;
  }
}

customElements.define("tasks-page", TasksPage);
