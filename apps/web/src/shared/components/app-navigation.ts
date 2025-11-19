import { html, LitElement } from "lit";
import { noShadow } from "../mixins/noShadow.ts";
import { useRouter } from "../mixins/useRouter.ts";

import "./nav-link.ts";

class AppNavigation extends useRouter(noShadow(LitElement)) {
  private activePath: string = "/";

  override connectedCallback() {
    super.connectedCallback();

    this.router?.onRouteCheck((path) => {
      this.activePath = path;
      this.requestUpdate();
    });
  }

  override render() {
    return html`
      <nav>
        <ul>
          <nav-link text="Dashboard " to="/" ?active="${this.activePath ==
            "/"}"></nav-link>
          <nav-link text="Tasks" to="/tasks" ?active="${this.activePath ==
            "/tasks"}"></nav-link>
        </ul>
      </nav>
    `;
  }
}

customElements.define("app-navigation", AppNavigation);
