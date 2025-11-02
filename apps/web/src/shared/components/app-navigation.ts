import { html, LitElement } from "lit";
import { ContextConsumer } from "@lit/context";

import { routerContext } from "@/router-context.ts";

class AppNavigation extends LitElement {
  // Consume the router context for navigation
  private router = new ContextConsumer(this, {
    context: routerContext,
    subscribe: true,
  });

  override connectedCallback() {
    super.connectedCallback();
    const routerInstance = this.router.value;

    if (!routerInstance) {
      console.error("Router instance not available in AppNavigation");
      return;
    }

    // Handle navigation clicks to prevent page reload
    this.addEventListener("click", (event: Event) => {
      const target = event.target as HTMLElement;

      if (target.tagName === "A") {
        const href = target.getAttribute("href");

        if (href && href.startsWith("/")) {
          event.preventDefault();
          routerInstance.navigate(href);
        }
      }
    });
  }

  override createRenderRoot() {
    // will render the template without shadow DOM
    return this;
  }

  override render() {
    return html`
      <nav>
        <ul>
          <li><a href="/">Dashboard</a></li>
          <li><a href="/tasks">Tasks</a></li>
          <li><a href="/tasks/1">Task 1</a></li>
          <li><a href="/tasks/2">Task 2</a></li>
          <li><a href="/foo">Foo</a></li>
        </ul>
      </nav>
    `;
  }
}

customElements.define("app-navigation", AppNavigation);
