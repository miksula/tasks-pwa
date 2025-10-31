import type { State } from "./types.ts";

import { uuid } from "./uuid.ts";

export class AppLogic {
  static initData(): State {
    return {
      items: [{ id: 1, text: "Task 1", completed: false }],
      filter: "all",
    };
  }

  static addItem(state: State, text: string) {
    state.items.push({
      id: uuid(),
      text,
      completed: false,
    });
  }
}
