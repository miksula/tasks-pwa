import { html, LitElement } from "lit";
import { ContextConsumer } from "@lit/context";

import { routerContext } from "@/router-context.ts";
import { NoShadow } from "@/shared/mixins/no-shadow.ts";

class AppLink extends NoShadow(LitElement) {
  text: string;
  to: string;

  static override properties = {
    text: {},
    to: {},
  };

  // Consume the router context for navigation
  private router = new ContextConsumer(this, {
    context: routerContext,
    subscribe: true,
  });

  constructor() {
    super();
    this.text = "";
    this.to = "/";
  }

  override render() {
    return html`
      <a href="${this.to}" @click="${this.handleClick}">${this.text}</a>
    `;
  }

  private handleClick(event: MouseEvent) {
    event.preventDefault();
    const routerInstance = this.router.value;
    routerInstance?.navigate(this.to);
  }
}

customElements.define("app-link", AppLink);
