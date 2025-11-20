import { css, html, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";

import type { Filter } from "@/shared/types.ts";
import { CheckMarkIcon } from "@/shared/icons/CheckMarkIcon.ts";
import { useStore } from "@/shared/mixins/useStore.ts";

export class FilterButton extends useStore(LitElement) {
  static override properties = {
    name: { type: String },
    active: { type: Boolean },
  };

  static override styles = css`
    button {
      display: flex;
      cursor: pointer;
      background-color: var(--grey4);
      color: var(--input-text);
      font-size: var(--text-xs);
      font-family: var(--font-sans);
      font-weight: var(--font-bold);
      border-style: none;
      padding-inline: var(--spacing-3);
      padding-block: var(--spacing-2);
      border-radius: var(--spacing-2);

      svg {
        width: 1rem;
        height: 1rem;
        margin-left: -3px;
        margin-right: 3px;
        transform: scale(1.25);
      }

      span {
        text-transform: capitalize;
      }
    }

    button.active {
      background-color: var(--blue1);
      color: var(--blue0);
    }
  `;

  declare name: Filter;
  declare active: boolean;

  override render() {
    const classes = classMap({
      active: this.active,
    });

    return html`
      <button class="${classes}" @click="${this.setFilter}">
        ${this.active ? CheckMarkIcon() : ""}
        <span>${this.name}</span>
      </button>
    `;
  }

  private setFilter() {
    this.store?.tasks.setFilter(this.name);
  }
}

customElements.define("filter-button", FilterButton);
