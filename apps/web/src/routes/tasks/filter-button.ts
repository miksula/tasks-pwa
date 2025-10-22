import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";

import type { Filter } from "../../lib/types.ts";

import { dispatchEvent } from "../../lib/app-store.ts";

type ButtonProps = {
  name: Filter;
  isActive: boolean;
};

export function FilterButton(props: ButtonProps) {
  const { name, isActive } = props;

  const classes = classMap({
    link: !isActive,
    primary: isActive,
  });

  function setFilter(event: Event) {
    const filter = name;
    dispatchEvent(event.target as HTMLElement, { type: "FILTER", filter });
  }

  return html`
    <button class="${classes}" @click="${setFilter}">Show ${name}</button>
  `;
}
