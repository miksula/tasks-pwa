import type { Action, State } from "./types.ts";

import { createTask, deleteTask, fetchTasks } from "./queries.ts";
import { EVENT_ACTION, EVENT_DATA, EVENT_LOAD } from "./constants.ts";

async function mutateState(action: Action) {
  switch (action.type) {
    case "ADD": {
      await createTask({ text: action.text, completed: 0 });
      break;
    }
    case "DELETE": {
      await deleteTask(action.id);
      break;
    }
    case "EDIT": {
      // Implementation for editing a task
      break;
    }
    case "COMPLETED": {
      // Implementation for toggling task completion
      break;
    }
  }
}

export function Store(el: HTMLElement) {
  let appState: State = {
    items: [],
    filter: "all",
  };

  el.addEventListener(EVENT_LOAD, updateState);

  el.addEventListener(EVENT_ACTION, (e: CustomEvent<Action>) => {
    mutateState(e.detail).then(() => {
      updateState();
    });
  });

  function updateState() {
    fetchTasks().then(function updateTasks(tasks) {
      appState = {
        ...appState,
        items: tasks,
      };

      notify();
    });
  }

  function notify() {
    el.dispatchEvent(
      new CustomEvent(EVENT_DATA, {
        detail: appState,
        bubbles: false,
      }),
    );
  }

  /**
   * Dispatches a type-safe action event.
   *
   * @param type - The action type (e.g., "ADD", "DELETE", "EDIT", "COMPLETED", "FILTER")
   * @param payload - The action payload matching the specific action type (without the type field)
   *
   * @example
   * const { action } = Store(element);
   *
   * action("ADD", { text: "New task" });
   * action("DELETE", { id: 123 });
   */
  function action<T extends Action["type"]>(
    type: T,
    payload: Omit<Extract<Action, { type: T }>, "type">,
  ) {
    el.dispatchEvent(
      new CustomEvent(EVENT_ACTION, {
        detail: { type, ...payload },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /**
   * @returns The current application state
   */
  function getState() {
    return appState;
  }

  return { action, getState };
}

/**
 * Dispatches a custom event for an action. Alternatively, you can use
 * the `action` method from the Store instance.
 *
 * @param el - The HTML element to dispatch the event from
 * @param detail - The action detail to include in the event
 * @param bubbles - Whether the event should bubble up through the DOM
 * @param composed - Whether the event should cross the shadow DOM boundary
 */
export function dispatchEvent(
  el: HTMLElement,
  detail: Action,
  bubbles = true,
  composed = true,
) {
  el.dispatchEvent(
    new CustomEvent(EVENT_ACTION, {
      detail,
      bubbles,
      composed,
    }),
  );
}
