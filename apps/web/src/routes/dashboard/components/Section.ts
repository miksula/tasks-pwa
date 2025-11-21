import { html } from "lit";

export function Section(title: string, slug: string, count: number) {
  return html`
    <section class="section">
      <div class="info">
        <h2>${title}</h2>

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
