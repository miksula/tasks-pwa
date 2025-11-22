import { html } from "lit";
import { useState } from "@/shared/hooks.ts";

export function Section(title: string, slug: string, count: number) {
  const [active, setActive] = useState(false);

  return html`
    <section @click="${() => setActive(!active)}" class="section ${active
      ? "active"
      : ""}">
      <div class="info">
        <h2>
          ${title}
        </h2>

        <div class="section-content">
          <p>${slug}</p>
        </div>
      </div>

      <div class="box">
        <span class="count">${count}</span>
      </div>
    </section>
  `;
}
