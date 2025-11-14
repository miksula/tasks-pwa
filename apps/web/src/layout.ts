import { html, type TemplateResult } from "lit";
import "@/shared/components/app-navigation.ts";

export default function Layout(content: TemplateResult | null) {
  return html`
    <div class="custom-app">
      <app-navigation></app-navigation>
      <main>${content}</main>
    </div>
  `;
}
