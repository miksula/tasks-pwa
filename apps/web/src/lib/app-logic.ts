import type { State } from "./types.ts";

import { uuid } from "./uuid.ts";

export class AppLogic {
  static initData(): State {
    return { items: [], filter: "all" } 
  }

  static addItem(state: State, text: string) {
    state.items.push({
      id: uuid(),
      text,
      completed: 0,
    });
  }
}
