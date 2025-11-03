import { LitElement, type TemplateResult } from "lit";
import { ContextProvider } from "@lit/context";

import Router, { RouteContext } from "@app/router";
// The context object for children to access the router instance.
// See: https://lit.dev/docs/data/context
import { routerContext } from "./router-context.ts";

import type { State } from "@/shared/types.ts";

// import { AppLogic } from "./lib/app-logic.ts";
// import { AppStore } from "./lib/app-store.ts";
import { EVENT_DATA, EVENT_LOAD } from "@/shared/constants.ts";
import { NoShadow } from "@/shared/mixins/no-shadow.ts";
import { Dashboard, NotFound, Task, Tasks } from "@/routes/index.ts";
import Layout from "./layout.ts";

export class MainApp extends NoShadow(LitElement) {
  private page: TemplateResult | null = null;
  // private state: State = AppLogic.initData();
  private router: Router = new Router();

  // Setup context provider
  private routerProvider = new ContextProvider(this, {
    context: routerContext,
    initialValue: this.router,
  });

  constructor() {
    super();
    // AppStore(this);

    this.router
      .add("/", () => {
        this.page = Dashboard();
      })
      .add("/tasks", () => {
        this.page = Tasks();
      })
      .add("/tasks/:id", (c: RouteContext) => {
        const id = c.params.id;
        this.page = Task(id);
      })
      .add(() => {
        this.page = NotFound(this.router.path);
      })
      .onRouteCheck(() => {
        this.requestUpdate();
      });

    // Initial route check on page load
    this.router.check();
  }

  override connectedCallback() {
    super.connectedCallback();

    // Listen for state update events
    this.addEventListener(EVENT_DATA, (event: CustomEvent<State>) => {
      // this.state = event.detail;
      // Update route based on new state
      this.router.check();
    });

    this.loadData();
  }

  private loadData() {
    // Trigger update to get the state from persistent storage
    this.dispatchEvent(new CustomEvent(EVENT_LOAD));
  }

  override render() {
    return Layout(this.page);
  }
}

customElements.define("main-app", MainApp);
