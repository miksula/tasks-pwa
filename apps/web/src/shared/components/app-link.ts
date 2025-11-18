import { html, LitElement } from "lit";
// import { ContextConsumer } from "@lit/context";

// import { routerContext } from "../router-context.ts";
import { noShadow } from "@/shared/mixins/no-shadow.ts";
import { useRouter } from "@/shared/mixins/use-router.ts";

const props = {
  text: { type: String },
  to: { type: String },
};

class AppLink extends useRouter(noShadow(LitElement)) {
  static override properties = props;

  /** The text content of the link. */
  public text: string;
  /** The target route/path of the link. */
  public to: string;

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

  private handleClick(event: Event) {
    event.preventDefault();
    this.router?.navigate(this.to);
  }
}

customElements.define("app-link", AppLink);
