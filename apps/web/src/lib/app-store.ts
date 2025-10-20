import { produce } from "immer";

import type { Action, State } from "@/web/lib/types";

import { AppLogic } from "@/web/lib/app-logic";
import { EVENT_ACTION, EVENT_DATA, EVENT_LOAD } from "@/web/lib/constants";

const getState = produce((state: State, action: Action) => {
  const { addItem } = AppLogic;

  switch (action.type) {
    case "ADD":
      addItem(state, action.text);
      break;
  }
});

type Timeout = ReturnType<typeof setTimeout>;

export function AppStore(el: HTMLElement) {
  let appState = AppLogic.initData();
  let saveTimeout: Timeout;

  el.addEventListener(EVENT_LOAD, load);

  el.addEventListener(EVENT_ACTION, (e: CustomEvent<Action>) => {
    appState = getState(appState, e.detail);
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
    try {
      if (localStorage?.todo) {
        appState = JSON.parse(localStorage.todo);
      }
    }
    catch (err) {
      console.warn(err);
    }

    update();
  }

  function save() {
    clearTimeout(saveTimeout);

    saveTimeout = setTimeout(() => {
      try {
        localStorage.todo = JSON.stringify(appState);
      }
      catch (err) {
        console.warn(err);
      }
    }, 100);
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
