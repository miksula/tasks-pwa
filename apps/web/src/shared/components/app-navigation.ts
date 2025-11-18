import { html, LitElement } from "lit";
import { noShadow } from "@/shared/mixins/no-shadow.ts";

import "./app-link.ts";

class AppNavigation extends noShadow(LitElement) {
  override render() {
    return html`
      <nav>
        <ul>
          <li><app-link text="Dashboard" to="/"></app-link></li>
          <li><app-link text="Tasks" to="/tasks"></app-link></li>
          <li><app-link text="Task 1" to="/tasks/1"></app-link></li>
          <li><app-link text="Task 2" to="/tasks/2"></app-link></li>
          <li><app-link text="Foo" to="/foo"></app-link></li>
        </ul>
      </nav>
    `;
  }
}

customElements.define("app-navigation", AppNavigation);
