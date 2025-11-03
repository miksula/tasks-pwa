import type { Action, State } from "./types.ts";

import { createTask, fetchTasks } from "./queries.ts";
import { EVENT_ACTION, EVENT_DATA, EVENT_LOAD } from "./constants.ts";

async function mutateState(action: Action) {
  switch (action.type) {
    case "ADD": {
      await createTask({ text: action.text, completed: 0 });
      break;
    }
  }
}

export const initialState: State = {
  items: [{ id: 0, text: "Loading...", completed: 0 }],
  filter: "all",
};

export function Store(el: HTMLElement) {
  let appState = initialState;

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
}

export function dispatchEvent(el: HTMLElement, detail: Action, bubbles = true) {
  el.dispatchEvent(
    new CustomEvent(EVENT_ACTION, {
      detail,
      bubbles,
    }),
  );
}
