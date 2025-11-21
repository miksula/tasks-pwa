import { html } from "lit";

export function Section(title: string, content: unknown) {
  return html`
    <section class="section">
      <div class="info">
        <h2>${title}</h2>

        <div class="section-content">
          <p>${content}</p>
        </div>
      </div>

      <div class="box">
        <span class="count">3</span>
      </div>
    </section>
  `;
}
