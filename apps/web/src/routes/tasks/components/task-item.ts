import { css, html, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";

import { type TodoItem } from "@/shared/types.ts";
import { dispatchEvent } from "@/shared/store.ts";
import { UseStore } from "@/shared/mixins/use-store.ts";

const styles = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  li.viewing.new {
    animation: fadeIn 100ms ease-in;
  }

  li.viewing, form.editing {
    display: flex;
  }
`;

const props = {
  item: { type: Object },
  new: { type: Boolean },
};

export class TaskItem extends UseStore(LitElement) {
  static override styles = styles;
  static override properties = props;

  /** The todo item to display and manage. */
  declare public item: TodoItem;
  /** Indicates if this is the latest added task. */
  declare public new: boolean;

  private isEditing = false;
  private newText = "";

  setEditing(isEditing: boolean, update = true) {
    this.isEditing = isEditing;
    if (update) {
      this.requestUpdate();
    }
  }

  toggleCompleted(item: TodoItem) {
    const id = Number(item.id);
    const completed = !item.completed;

    this.store?.action("COMPLETED", {
      id,
      completed: completed ? 1 : 0,
    });
  }

  removeTask(item: TodoItem) {
    const id = Number(item.id);
    this.store?.action("DELETE", { id });
  }

  editTask(item: Omit<TodoItem, "completed">) {
    dispatchEvent(this, {
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
    this.editTask({ id: Number(item.id), text: this.newText });
    this.newText = "";
  }

  override render() {
    const item = this.item;

    const viewTemplate = html`
      <li class="viewing ${this.new ? "new" : ""}">
        <div>
          <input
            type="checkbox"
            ?checked="${item.completed}"
            @click="${() => this.toggleCompleted(item)}"
          />
          <span class="${classMap({ "completed": item.completed })}"> ${item
            .text} </span>
        </div>
        <div>
          <button @click="${() => this.setEditing(true)}">
            Edit
          </button>
          <button @click="${() => this.removeTask(item)}">
            Delete
          </button>
        </div>
      </li>
    `;

    const editingTemplate = html`
      <form class="editing" @submit="${(event: InputEvent) =>
        this.handleSubmit(event, item)}">
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
