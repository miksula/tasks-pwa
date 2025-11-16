import { LitElement } from "lit";
import { ContextProvider } from "@lit/context";
import { Store } from "../store.ts";

// The context object for children to access the router instance.
// See: https://lit.dev/docs/data/context
import { storeContext } from "./store-context.ts";

export const WithStore = (superClass: typeof LitElement) =>
  class WithStoreMixin extends superClass {
    protected store = Store(this);

    private _storeProvider = new ContextProvider(this, {
      context: storeContext,
      initialValue: this.store,
    });
  };
