import { LitElement, type TemplateResult } from "lit";

import type { State } from "@/shared/types.ts";
import { EVENT_DATA, EVENT_LOAD } from "@/shared/constants.ts";
import { noShadow } from "@/shared/mixins/noShadow.ts";
import { withRouter } from "@/shared/mixins/withRouter.ts";
import { withStore } from "@/shared/mixins/withStore.ts";

import { Dashboard, NotFound, Task, Tasks, Test } from "@/routes/index.ts";
import Layout from "./Layout.ts";

export class MainApp extends withRouter(withStore(noShadow(LitElement))) {
  private page: TemplateResult | null = null;
  private state: State = this.store.getState();

  constructor() {
    super();

    this.router
      .add("/", () => {
        this.page = Dashboard(this.state);
      })
      .add("/tasks", () => {
        this.page = Tasks(this.state.tasks);
      })
      .add("/tasks/:id", (c) => {
        const id = c.params.id;
        this.page = Task(id);
      })
      .add("/test", () => {
        this.page = Test();
      })
      .add("/*", () => {
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
    addEventListener(EVENT_DATA, (event: CustomEvent<State>) => {
      this.state = event.detail;
      // Update route based on new state
      this.router.check();
    });

    this.loadData(); // Trigger initial update to get the state from persistent storage
  }

  private loadData() {
    dispatchEvent(new CustomEvent(EVENT_LOAD));
  }

  override render() {
    return Layout(this.page);
  }
}

customElements.define("main-app", MainApp);
