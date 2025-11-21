import { html } from "lit";
import { Section } from "./components/Section.ts";

const sections = [
  {
    title: "Total",
    content: "Counts all your tasks.",
  },
  {
    title: "Completed",
    content: "Number of finished tasks.",
  },
  {
    title: "Active",
    content: "The tasks that are yet to be completed.",
  },
];

export function Dashboard() {
  return html`
    <div class="dashboard">
      <h1>Dashboard</h1>

      <div class="blog-sections">
        ${sections.map((section) => Section(section.title, section.content))}
      </div>
    </div>
  `;
}
