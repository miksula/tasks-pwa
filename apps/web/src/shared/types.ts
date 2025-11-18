import type { State } from "./stores/store.ts";

export type { State };

export type TodoItem = {
  id: number | string;
  text: string;
  completed: 0 | 1;
};

export type Filter = "all" | "active" | "completed";

export type Action = {
  name: string;
};

declare global {
  interface GlobalEventHandlersEventMap {
    EVENT_LOAD: CustomEvent;
    EVENT_DATA: CustomEvent<State>;
    EVENT_ACTION: CustomEvent<Action>;
  }
}
