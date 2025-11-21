import { html } from "lit";
import { State, TodoItem } from "@/shared/types.ts";
import { Section } from "./components/Section.ts";

const sections = [
  {
    title: "Total",
    slug: "Counts all your tasks.",
    filter: () => true,
  },
  {
    title: "Completed",
    slug: "Number of finished tasks.",
    filter: (todo: TodoItem) => todo.completed,
  },
  {
    title: "Left to-do",
    slug: "The tasks yet to be completed.",
    filter: (todo: TodoItem) => !todo.completed,
  },
];

export function Dashboard(data: State) {
  const items = data.tasks.items;

  const mappedSections = sections.map((section) => {
    const count = items.filter(section.filter).length;
    return { ...section, count };
  });

  return html`
    <div class="dashboard">
      <h1>Dashboard</h1>

      <div class="blog-sections">
        ${mappedSections.map((section) =>
          Section(section.title, section.slug, section.count)
        )}
      </div>
    </div>
  `;
}
