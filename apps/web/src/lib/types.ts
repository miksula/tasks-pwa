export type TodoItem = {
  id: number | string;
  text: string;
  completed: 0 | 1;
};

export type Filter = "all" | "active" | "completed";

export type State = {
  items: TodoItem[];
  filter: Filter;
};

export type Action =
  | { type: "ADD"; text: string }
  | { type: "COMPLETED"; id: number; completed: 0 | 1 }
  | { type: "FILTER"; filter: Filter }
  | { type: "DELETE"; id: number }
  | { type: "EDIT"; id: number; text: string };

declare global {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface GlobalEventHandlersEventMap {
    EVENT_DATA: CustomEvent<State>;
    EVENT_ACTION: CustomEvent<Action>;
  }
}
