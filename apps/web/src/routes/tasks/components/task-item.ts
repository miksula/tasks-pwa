import { html, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";

import { NoShadow } from "@/shared/mixins/no-shadow.ts";
import { type TodoItem } from "@/shared/types.ts";
import { dispatchEvent } from "@/shared/store.ts";

export class TaskItem extends NoShadow(LitElement) {
  static override properties = {
    item: { attribute: false },
  };

  item: TodoItem;

  constructor() {
    super();
    this.item = {} as TodoItem;
  }

  private isEditing = false;
  private wasEditing = false;
  private newText = "";

  setEditing(isEditing: boolean, update = true) {
    this.isEditing = isEditing;
    if (!isEditing) {
      this.wasEditing = true;
    }
    if (update) {
      this.requestUpdate();
    }
  }

  toggleCompleted(
    event: InputEvent,
    item: TodoItem,
  ) {
    const id = Number(item.id);
    const completed = !item.completed;

    dispatchEvent(event.target as HTMLElement, {
      type: "COMPLETED",
      id,
      completed: completed ? 1 : 0,
    });
  }

  removeTask(event: InputEvent, item: TodoItem) {
    const id = Number(item.id);
    dispatchEvent(event.target as HTMLElement, { type: "DELETE", id });
  }

  editTask(
    event: InputEvent | KeyboardEvent,
    item: Omit<TodoItem, "completed">,
  ) {
    dispatchEvent(event.target as HTMLElement, {
      type: "EDIT",
      id: Number(item.id),
      text: item.text,
    });
  }

  handleChange(event: KeyboardEvent, item: TodoItem) {
    this.newText = (event.target as HTMLInputElement)?.value;
    if (event.key === "Enter") {
      this.handleSubmit(event, item);
    }
  }

  handleSubmit(event: InputEvent | KeyboardEvent, item: TodoItem) {
    event.preventDefault();
    if (!this.newText.trim()) {
      return;
    }
    this.setEditing(false, false);
    this.editTask(event, { id: Number(item.id), text: this.newText });
    this.newText = "";
  }

  override render() {
    const item = this.item;

    const viewTemplate = html`
      <li class="pb-2 flex justify-between items-center">
        <div>
          <input
            type="checkbox"
            ?checked="${item.completed}"
            @click="${(event: InputEvent) => this.toggleCompleted(event, item)}"
          />
          <span class="${classMap({ "completed": item.completed })}"> ${item
            .text} </span>
        </div>
        <div>
          <button @click="${() => this.setEditing(true)}">
            Edit
          </button>
          <button @click="${(event: InputEvent) =>
            this.removeTask(event, item)}">
            Delete
          </button>
        </div>
      </li>
    `;

    const editingTemplate = html`
      <form @submit="${(event: InputEvent) => this.handleSubmit(event, item)}">
        <div>
          <input
            type="text"
            .value="${this.newText || item.text}"
            @keydown="${(event: KeyboardEvent) =>
              this.handleChange(event, item)}"
          />
        </div>
        <div>
          <button
            @click="${() => this.setEditing(false)}"
          >
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
    `;

    return this.isEditing ? editingTemplate : viewTemplate;
  }
}

customElements.define("task-item", TaskItem);
