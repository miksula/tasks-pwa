import tasksStore from "./tasksStore.ts";
import { EVENT_ACTION, EVENT_DATA, EVENT_LOAD } from "../constants.ts";
import { Action } from "../types.ts";

export interface State {
  tasks: typeof tasksStore.initialState;
}

const initialState = {
  tasks: tasksStore.initialState,
};

export default function Store() {
  const appState: State = initialState;

  addEventListener(EVENT_LOAD, () => updateState());

  addEventListener(EVENT_ACTION, (e: CustomEvent<Action>) => {
    const { name } = e.detail;
    updateState(name);
  });

  async function updateState(_action?: string) {
    appState.tasks = await tasksStore.load();
    notify();
  }

  function notify() {
    dispatchEvent(
      new CustomEvent(EVENT_DATA, {
        detail: appState,
        bubbles: false,
        composed: true,
      }),
    );
  }

  return {
    /** @returns The current application state */
    getState() {
      return appState;
    },

    /** Reference to tasks store */
    tasks: tasksStore,
  };
}
