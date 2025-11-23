import { css, html, LitElement, PropertyValues } from "lit";
import { repeat } from "lit/directives/repeat.js";

import type { Filter, State, TodoItem } from "@/shared/types.ts";
import { useStore } from "@/shared/mixins/useStore.ts";

import "./task-item.ts";
import "./filter-button.ts";

const FILTER_MAP = {
  all: () => true,
  active: (todo: TodoItem) => !todo.completed,
  completed: (todo: TodoItem) => todo.completed,
};

export default class TasksPage extends useStore(LitElement) {
  static override properties = {
    data: {},
  };

  static override styles = css`
    .tasks {
      margin: 0 auto;
      max-width: var(--container-width);
    }

    h1 {
      font: var(--heading1);
      margin-block: 0;
    }

    .input-group {
      display: flex;
      gap: var(--spacing-2);
      margin-block: var(--spacing-4);

      input {
        flex: 1;
        color: var(--color-zinc-800);
        font-size: var(--text-base);
        font-family: var(--font-sans);
        border-style: none;
        background-color: var(--color-zinc-200);
        padding-inline: var(--spacing-3);
        padding-block: var(--spacing-2);
        border-radius: var(--radius-lg);
      }

      button.action {
        cursor: pointer;
        background-color: var(--color-brand-blue-light);
        color: var(--color-brand-blue);
        font-size: var(--text-xs);
        font-family: var(--font-sans);
        font-weight: var(--font-weight-semibold);
        border-style: none;
        padding-inline: var(--spacing-3);
        padding-block: var(--spacing-2);
        border-radius: var(--radius-lg);
        text-transform: uppercase;
      }
    }

    .label {
      font: var(--label);
    }

    .filter-by-group {
      display: flex;
      gap: var(--spacing-2);
      margin-block: var(--spacing-4);
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  `;

  /** The tasks store state. */
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
    const { items, filter } = this.data;

    const filteredItems = items.filter(FILTER_MAP[filter]);

    const filterButtons = (Object.keys(FILTER_MAP) as Filter[]).map(
      function mapNameToBtn(name) {
        return html`
          <filter-button
            name="${name}"
            ?active="${name == filter}"
          ></filter-button>
        `;
      },
    );

    const count = filteredItems.length;
    const itemsCountText = `${count} task${count == 1 ? "" : "s"}`;

    return html`
      <section class="tasks">
        <h1>Tasks</h1>
        <p>What needs to be done?</p>

        <div class="input-group">
          <input
            type="text"
            id="new-task-input"
            @keyup="${this.keyboardAction}"
          />
          <button class="action" @click="${this.saveTask}">Add Task</button>
        </div>

        <p class="label">Filter by</p>

        <div class="filter-by-group">
          ${filterButtons}
        </div>

        <ul>
          ${repeat(
            filteredItems,
            (item: TodoItem) => item.id,
            (item) =>
              html`
                <task-item .item="${item}" ?new="${item.id ==
                  this.newId}"></task-item>
              `,
          )}
        </ul>

        <p class="label">${itemsCountText}</p>
      </section>
    `;
  }
}

customElements.define("tasks-page", TasksPage);
