import { LitElement, type TemplateResult } from "lit";

import type { State } from "@/shared/types.ts";
import { initialState, Store } from "@/shared/store.ts";
import { EVENT_DATA, EVENT_LOAD } from "@/shared/constants.ts";
import { NoShadow } from "@/shared/mixins/no-shadow.ts";
import { WithRouter } from "@/shared/mixins/with-router.ts";

import { Dashboard, NotFound, Task, Tasks } from "@/routes/index.ts";
import Layout from "./layout.ts";

export class MainApp extends WithRouter(NoShadow(LitElement)) {
  private page: TemplateResult | null = null;
  private state: State = initialState;

  constructor() {
    super();
    Store(this);

    this.router
      .add("/", () => {
        this.page = Dashboard();
      })
      .add("/tasks", () => {
        this.page = Tasks(this.state);
      })
      .add("/tasks/:id", (c) => {
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
      console.log("MainApp received state update:", event.detail);
      this.state = event.detail;
      // Update route based on new state
      this.router.check();
    });

    this.loadData(); // Trigger initial update to get the state from persistent storage
  }

  private loadData() {
    this.dispatchEvent(new CustomEvent(EVENT_LOAD));
  }

  override render() {
    return Layout(this.page);
  }
}

customElements.define("main-app", MainApp);
