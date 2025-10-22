import { html } from "lit";
import { createRef, type Ref, ref } from "lit/directives/ref.js";
import { repeat } from "lit/directives/repeat.js";

import type { Filter, State, TodoItem } from "../../lib/types.ts";

import { dispatchEvent } from "../../lib/app-store.ts";

import "./task-item.ts";
import { FilterButton } from "./filter-button.ts";

const FILTER_MAP = {
  all: () => true,
  active: (todo: TodoItem) => !todo.done,
  completed: (todo: TodoItem) => todo.done,
};

export function TasksList(data: State) {
  const { items, filter } = data;

  const inputRef: Ref<HTMLInputElement> = createRef();
  const elementRef: Ref<HTMLElement> = createRef();

  const taskList = items.filter(FILTER_MAP[filter]);

  const filterButtons = (Object.keys(FILTER_MAP) as Filter[]).map(
    function mapNameToBtn(name) {
      return FilterButton({
        name,
        isActive: name === filter,
      });
    },
  );

  const count = taskList.length;
  const statusText = `${count} task${count === 1 ? "" : "s"} remaining`;

  function keyboardActions(event: KeyboardEvent) {
    switch (event.key) {
      case "Enter":
        save();
        break;
      case "Escape":
        clear();
        break;
    }
  }

  function saveTodo(e: InputEvent) {
    const input = inputRef.value!;
    e.preventDefault();
    save();
    input.focus();
  }

  function save() {
    const input = inputRef.value!;
    const element = elementRef.value!;

    const text = input.value.trim();
    if (!text) {
      return;
    }
    input.value = "";

    dispatchEvent(element, { type: "ADD", text });
  }

  function clear() {
    const input = inputRef.value!;
    input.value = "";
    input.blur();
  }

  return html`
    <div ${ref(elementRef)} class="todo-list">
      <label for="new-todo-input">
        <h2>What are you planning?</h2>
      </label>

      <form>
        <div class="todo-input">
          <input
            ${ref(inputRef)}
            type="text"
            id="new-todo-input"
            minlength="5"
            autocomplete="off"
            @keyup="${keyboardActions}"
          />
          <button @click="${saveTodo}" type="submit" class="primary">Add</button>
        </div>
      </form>

      <section class="py-2">${filterButtons}</section>

      <p class="font-bold px-1">${statusText}</p>

      <ul class="py-2">
        ${repeat(
          items,
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
