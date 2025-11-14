import { LitElement } from "lit";
import { ContextProvider } from "@lit/context";
import Router from "@app/router";

// The context object for children to access the router instance.
// See: https://lit.dev/docs/data/context
import { routerContext } from "../router-context.ts";

export const WithRouter = (superClass: typeof LitElement) =>
  class WithRouterMixin extends superClass {
    protected router = new Router();

    private _routerProvider = new ContextProvider(this, {
      context: routerContext,
      initialValue: this.router,
    });
  };
