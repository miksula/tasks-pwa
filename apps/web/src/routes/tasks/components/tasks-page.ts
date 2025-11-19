import { css, html, LitElement, PropertyValues } from "lit";
import { repeat } from "lit/directives/repeat.js";

import type { State, TodoItem } from "@/shared/types.ts";
import { useStore } from "@/shared/mixins/useStore.ts";

import { CheckMark } from "@/shared/icons/CheckMark.ts";
import "./task-item.ts";

const props = {
  data: {},
};

export default class TasksPage extends useStore(LitElement) {
  static override properties = props;

  static override styles = css`
    .tasks-page {
      margin: 0 auto;
      max-width: 400px;
      padding: calc(var(--spacing) * 4);
    }

    h1 {
      font: 400 2.25rem / 2.75rem var(--font-sans);
    }

    .input-group {
      display: flex;
      gap: calc(var(--spacing) * 2);
      margin-block: calc(var(--spacing) * 4);

      input {
        flex: 1;
        color: var(--input-text);
        font-size: var(--text-base);
        font-family: var(--font-sans);
        border-style: none;
        background-color: var(--input-bg);
        padding-inline: calc(var(--spacing) * 3);
        padding-block: calc(var(--spacing) * 2);
        border-radius: calc(var(--spacing) * 2);
      }

      button {
        cursor: pointer;
        background-color: var(--blue1);
        color: var(--blue0);
        font-size: var(--text-sm);
        font-family: var(--font-sans);
        font-weight: var(--font-bold);
        border-style: none;
        padding-inline: calc(var(--spacing) * 3);
        padding-block: calc(var(--spacing) * 2);
        border-radius: calc(var(--spacing) * 2);
        text-transform: uppercase;
      }
    }

    .filter-title {
      font-size: var(--text-base-sm);
      font-family: var(--font-sans);
      font-weight: var(--font-medium);
    }

    .filter-by-group {
      display: flex;
      gap: calc(var(--spacing) * 2);
      margin-block: calc(var(--spacing) * 4);

      button {
        display: flex;
        cursor: pointer;
        background-color: var(--grey4);
        color: var(--input-text);
        font-size: var(--text-sm);
        font-family: var(--font-sans);
        font-weight: var(--font-bold);
        border-style: none;
        padding-inline: calc(var(--spacing) * 3);
        padding-block: calc(var(--spacing) * 2);
        border-radius: calc(var(--spacing) * 2);

        svg {
          width: 1rem;
          height: 1rem;
          margin-left: -3px;
          margin-right: 3px;
          transform: scale(1.25);
        }
      }

      button.active {
        background-color: var(--blue1);
        color: var(--blue0);
      }
    }
  `;

  /** The application state. */
  declare public data: State["tasks"];

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
      this.store?.tasks.add(text);
    }
  }

  clear() {
    if (this.input) {
      this.input.value = "";
      this.input.blur();
    }
  }

  override willUpdate(changedProperties: PropertyValues) {
    const data = changedProperties.get("data") as State["tasks"] | undefined;
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
      <div class="tasks-page">
        <h1>Tasks</h1>
        <p>What needs to be done?</p>

        <div class="input-group">
          <input
            type="text"
            id="new-task-input"
            @keyup="${this.keyboardAction}"
          />
          <button @click="${this.saveTask}">Add Task</button>
        </div>

        <p class="filter-title">Filter by</p>
        <div class="filter-by-group">
          <button class="active">
            ${CheckMark()}
            <span>All</span>
          </button>
          <button>Active</button>
          <button>Completed</button>
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
