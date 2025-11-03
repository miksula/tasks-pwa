import { LitElement } from "lit";

export const NoShadow = (superClass: typeof LitElement) =>
  class NoShadowMixin extends superClass {
    override createRenderRoot() {
      // will render the template without shadow DOM
      return this;
    }
  };
