// import { produce } from "immer";

import type { Action, State } from "./types.ts";
import apiClient from "./api-client.ts";

import { AppLogic } from "./app-logic.ts";
import { EVENT_ACTION, EVENT_DATA, EVENT_LOAD } from "./constants.ts";

// const getState = produce((state: State, action: Action) => {
//   const { addItem } = AppLogic;

//   switch (action.type) {
//     case "ADD":
//       addItem(state, action.text);
//       break;
//   }
// });

async function setState(state: State, action: Action) {
  let result: unknown;
  
  switch (action.type) {
    case "ADD": {
      result = await apiClient.api.tasks.$post({ json: { text: action.text, completed: 0 } }).then(async (response) => {
        const json = await response.json();
        return json;
      });
    }
  }

  return result;
}

// type Timeout = ReturnType<typeof setTimeout>;

export function AppStore(el: HTMLElement) {
  let appState = AppLogic.initData();
  // let saveTimeout: Timeout;

  el.addEventListener(EVENT_LOAD, load);

  el.addEventListener(EVENT_ACTION, async (e: CustomEvent<Action>) => {
    const result = await setState(appState, e.detail);
    console.log("Result:", result);
    update();
  });

  function update() {
    save();

    el.dispatchEvent(
      new CustomEvent(EVENT_DATA, {
        detail: appState,
        bubbles: false,
      }),
    );
  }

  function load() {
    apiClient.api.tasks.$get().then(async (tasks) => {
      const result = await tasks.json();

      appState = {
        ...appState,
        items: result,
      };

      update();
    });
  }

  function save() {
    // clearTimeout(saveTimeout);

    // saveTimeout = setTimeout(() => {
    //   try {
    //     localStorage.todo = JSON.stringify(appState);
    //   } catch (err) {
    //     console.warn(err);
    //   }
    // }, 100);
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
