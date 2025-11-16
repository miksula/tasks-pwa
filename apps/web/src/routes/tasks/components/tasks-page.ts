import { html, LitElement, PropertyValues } from "lit";
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
  private newId?: number;

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

  override willUpdate(changedProperties: PropertyValues) {
    const data = changedProperties.get("data") as State | undefined;
    if (data) {
      const previousItems = data.items;
      const currentItems = this.data.items;

      if (currentItems.length - previousItems.length == 1) {
        // A new item was added
        const newItem = currentItems.find(
          (item) => !previousItems.some((prev) => prev.id === item.id),
        );
        if (newItem) {
          this.newId = Number(newItem.id);
        }
      }
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
                <task-item .item="${item}" ?new="${item.id ==
                  this.newId}"></task-item>
              `,
          )}
        </ul>
      </div>
    `;
  }
}

customElements.define("tasks-page", TasksPage);
