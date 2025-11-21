import { css, html, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";

import { type TodoItem } from "@/shared/types.ts";
import { useStore } from "@/shared/mixins/useStore.ts";
import { EditIcon } from "../../../shared/icons/EditIcon.ts";
import { DeleteIcon } from "../../../shared/icons/DeleteIcon.ts";

const styles = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  li.viewing, form.editing {
    display: flex;
  }

  li.viewing {
    justify-content: space-between;
    padding-block: var(--spacing-4);
    border-bottom: 1px solid var(--main-border-light);
  }

  li.viewing.new {
    animation: fadeIn 100ms ease-in;
  }

  li.viewing input + span {
    margin-left: var(--spacing-2);
  }

  li.viewing button {
    cursor: pointer;
    background: none;
    border: none;
    font-size: var(--text-xs);
    font-family: var(--font-sans);
    color: var(--grey1);

    &:hover {
      color: var(--main-text);
    }

    svg {
      width: 1rem;
      height: 1rem;
    }
  }

  li.viewing span.completed {
    text-decoration: line-through;
    color: var(--disabled-text);
  }

  form.editing {
    justify-content: space-between;
    padding-block: var(--spacing-4);
    border-bottom: 1px solid var(--main-border-light);
    width: 100%;
    gap: var(--spacing-2);

    input {
      flex: 1;
      color: var(--input-text);
    }
  }
`;

const props = {
  item: { type: Object },
  new: { type: Boolean },
};

export class TaskItem extends useStore(LitElement) {
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
    this.store?.tasks.completed(
      String(item.id),
      !item.completed ? 1 : 0,
    );
  }

  removeTask(item: TodoItem) {
    const id = String(item.id);
    this.store?.tasks.delete(id);
  }

  editTask(item: Omit<TodoItem, "completed">) {
    this.store?.tasks.edit(String(item.id), item.text);
  }

  handleChange(event: KeyboardEvent, item: TodoItem) {
    this.newText = (event.target as HTMLInputElement)?.value;
    if (event.key == "Enter") {
      this.handleSubmit(event, item);
    }
  }

  handleSubmit(event: InputEvent | KeyboardEvent, item: TodoItem) {
    event.preventDefault();
    if (!this.newText.trim()) {
      return;
    }
    this.setEditing(false);
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
            @keypress="${(e: KeyboardEvent) => {
              if (e.key === "Enter") {
                this.toggleCompleted(item);
              }
            }}"
          />
          <span class="${classMap({ "completed": item.completed })}"> ${item
            .text} </span>
        </div>
        <div class="action-buttons">
          <button title="Edit" @click="${() => this.setEditing(true)}">
            ${EditIcon()}
          </button>
          <button title="Remove" @click="${() => this.removeTask(item)}">
            ${DeleteIcon()}
          </button>
        </div>
      </li>
    `;

    const editingTemplate = html`
      <form class="editing" @submit="${(event: InputEvent) =>
        this.handleSubmit(event, item)}">
        <input
          name="task-edit"
          type="text"
          .value="${this.newText || item.text}"
          @input="${(event: KeyboardEvent) => this.handleChange(event, item)}"
        />
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
