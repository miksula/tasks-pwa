import type { PropertyValues } from "lit";

import { html, LitElement } from "lit";
// import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import type { TodoItem } from "@/web/lib/types";

import { dispatchEvent } from "@/web/lib/app-store.ts";

export class TaskItem extends LitElement {
  declare item: TodoItem;
  static properties = { item: { type: Object } };

  private isEditing = false;
  private wasEditing = false;
  private newText = "";

  protected createRenderRoot() {
    return this; // will render the template without shadow DOM
  }

  protected setEditing(isEditing: boolean, update = true) {
    this.isEditing = isEditing;
    if (!isEditing) {
      this.wasEditing = true;
    }
    if (update) {
      this.requestUpdate();
    }
  }

  protected toggleCompleted(
    event: InputEvent,
    item: TodoItem,
  ) {
    const id = Number(item.id);
    const done = !item.done;

    dispatchEvent(event.target as HTMLElement, {
      type: "COMPLETED",
      id,
      done,
    });
  }

  protected removeTask(event: InputEvent, item: TodoItem) {
    const id = Number(item.id);
    dispatchEvent(event.target as HTMLElement, { type: "DELETE", id });
  }

  protected editTask(
    event: InputEvent | KeyboardEvent,
    { id, text }: { id: number; text: string },
  ) {
    dispatchEvent(event.target as HTMLElement, { type: "EDIT", id, text });
  }

  protected handleChange(event: KeyboardEvent, item: TodoItem) {
    this.newText = (event.target as HTMLInputElement).value;
    if (event.key === "Enter") {
      this.handleSubmit(event, item);
    }
  }

  protected handleSubmit(event: InputEvent | KeyboardEvent, item: TodoItem) {
    event.preventDefault();
    if (!this.newText.trim()) {
      return;
    }
    this.setEditing(false, false);
    this.editTask(event, { id: Number(item.id), text: this.newText });
    this.newText = "";
  }

  protected render() {
    const item = this.item;

    const viewTemplate = html`
      <li class="pb-2 flex justify-between items-center">
        <div>
          <input
            type="checkbox"
            ?checked=${item.done}
            @click=${(event: InputEvent) => this.toggleCompleted(event, item)}
          />
          <span class=${classMap({ dimmed: item.done })}> ${item.text} </span>
        </div>
        <div>
          <button
            class="todo-edit link small uppercase"
            @click=${() => this.setEditing(true)}
          >
            Edit
          </button>
          <button
            class="error small uppercase"
            @click=${(event: InputEvent) =>
              this.removeTask(event, item)}
          >
            Delete
          </button>
        </div>
      </li>
    `;

    const editingTemplate = html`
      <form
        class="pb-2 flex justify-between items-center"
        @submit=${(event: InputEvent) => this.handleSubmit(event, item)}
      >
        <div class="flex-1 pr-1">
          <input
            type="text"
            class="todo-text small w-full"
            .value=${this.newText || item.text}
            @keydown=${(event: KeyboardEvent) => this.handleChange(event, item)}
          />
        </div>
        <div>
          <button
            class="link small uppercase"
            @click=${() => this.setEditing(false)}
          >
            Cancel
          </button>
          <button type="submit" class="primary small uppercase">Save</button>
        </div>
      </form>
    `;

    return this.isEditing ? editingTemplate : viewTemplate;
  }

  protected updated(_changedProperties: PropertyValues) {

  }
}

customElements.define("task-item", TaskItem);
