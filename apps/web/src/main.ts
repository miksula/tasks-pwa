import { html, LitElement, type TemplateResult } from "lit";
import { classMap } from "lit/directives/class-map.js";

import type { State } from "@/web/lib/types";

import { AppLogic } from "@/web/lib/app-logic";
import { AppStore } from "@/web/lib/app-store";
import { EVENT_DATA, EVENT_LOAD } from "@/web/lib/constants";
import Router from "@/web/lib/router";
import "@/web/routes/tasks/tasks-route";

function Home() {
  return html`<div>Home</div>`;
}

function Tasks(data: State) {
  return html`<tasks-route .data=${data}></tasks-route>`;
}

function Task(taskId: string) {
  return html`<div>Task Detail - ${taskId}</div>`;
}

function NotFound(path: string) {
  return html`<div>
    Not found - ${path}
  </div>`;
}

export class CustomApp extends LitElement {
  private activeRoute: TemplateResult = html`<div>Loading...</div>`;
  private state: State = AppLogic.initData();
  private router: Router = new Router();

  constructor() {
    super();
    AppStore(this);

    this.router
      .add(/^$/, () => {
        this.activeRoute = Home();
      })
      .add(/^tasks$/, () => {
        this.activeRoute = Tasks(this.state);
      })
      .add(/^tasks\/(.*)/, (...args) => {
        const id = args[1];
        this.activeRoute = Task(id);
      })
      .add(() => {
        const path = this.router.getPath();
        this.activeRoute = NotFound(path);
      })
      .onRouteChange(() => {
        this.requestUpdate();
      });

    // Initial route check on page load
    this.router.check();
  }

  connectedCallback() {
    super.connectedCallback();

    // Listen for state update events
    this.addEventListener(EVENT_DATA, (event: CustomEvent<State>) => {
      this.state = event.detail;
      // Update route based on new state
      this.router.check();
    });

    // Trigger update to get the state from persistent storage
    this.dispatchEvent(new CustomEvent(EVENT_LOAD));

    // Handle navigation clicks to prevent page reload
    this.addEventListener("click", (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "A") {
        const href = target.getAttribute("href");
        if (href && href.startsWith("/")) {
          event.preventDefault();
          this.router.navigate(href);
        }
      }
    });
  }

  createRenderRoot() {
    return this; // will render the template without shadow DOM
  }

  render() {
    return html`
      <div class="custom-app">
        <nav>
          <div>
            <div>
              <div>
                <div>
                  <a href="/" class=${classMap({ active: this.router.path == "/" })}>Dashboard</a>
                  <a href="/tasks" class=${classMap({ active: this.router.path == "/tasks" })}>Tasks</a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main>${this.activeRoute}</main>
      </div>
    `;
  }
}

customElements.define("custom-app", CustomApp);
