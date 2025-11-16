import { LitElement } from "lit";
import { ContextConsumer } from "@lit/context";

import { storeContext } from "./store-context.ts";

type Constructor<T = Record<string, never>> = new (...args: any[]) => T;

export function UseStore<T extends Constructor<LitElement>>(Base: T) {
  return class UseStoreMixin extends Base {
    // Consume the store context
    private storeInstance = new ContextConsumer(this, {
      context: storeContext,
      subscribe: true,
    });

    protected get store() {
      return this.storeInstance.value;
    }
  };
}
