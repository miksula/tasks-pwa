
import { html, LitElement } from "lit";
import {
  MutationObserver,
  QueryClient,
  QueryObserver,
} from "@tanstack/query-core";
import { getTodos, postTodo } from "./my-api/index.js";

/**
 * Create a QueryClient configured for local storage persistence.
 * 
 * @summary When querying data from local data source, we should configure the 
 * QueryClient to minimize or disable the in-memory caching. This configuration treats 
 * TanStack Query more as a state synchronization layer rather than a traditional cache.
 * 
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "always", // Set to "always" to always fetch and ignore the online / offline state.
      staleTime: Infinity, // Data is always fresh since it's from local data.
      cacheTime: 0, // Minimize memory usage; data persists in storage.
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * @summary An example Lit component demonstrating integration with @tanstack/query-core.
 * @description
 * `my-element` fetches, displays, and adds "todos" using TanStack Query for state
 * management. It sets up a `QueryObserver` to get the list of todos and a
 * `MutationObserver` to add new ones. The component automatically updates when the
 * underlying data changes.
 *
 * @element my-element
 *
 * @property {Array<Object>} todos - The internal state property holding the list of todo items.
 * Each todo object is expected to have `id` and `title` properties. It is updated automatically
 * by the QueryObserver.
 *
 * @slot - This element has a default unnamed slot. Content placed here will be rendered inside the main container div.
 * @csspart button - The button element that triggers adding a new todo.
 */
export class MyElement extends LitElement {
  static get properties() {
    return {
      todos: { state: true, type: Array },
    };
  }

  constructor() {
    super();
    this.todos = [];
  }

  connectedCallback() {
    super.connectedCallback();

    // Create a QueryObserver
    const query = new QueryObserver(queryClient, {
      queryKey: ["todos"],
      queryFn: getTodos,
    });

    // Subscribe to results
    query.subscribe((result) => {
      console.log("Query result:", result.status, result.data);
      if (result.data) {
        this.todos = result.data;
      }
      this.requestUpdate();
    });

    // Create a MutationObserver
    this.mutation = new MutationObserver(queryClient, {
      mutationFn: postTodo,
      onSuccess: (data) => {
        console.log("Mutation succeeded:", data);
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
    });

    // Subscribe to mutation results (optional)
    this.mutation.subscribe((result) => {
      console.log("Mutation result:", result.status, result.data);
    });
  }

  render() {
    return html`
      <div>
        <slot></slot>
        <ul>
          ${this.todos.map((todo) =>
            html`
              <li key="${todo.id}">${todo.title}</li>
            `
          )}
        </ul>

        <button @click="${this.onClick}" part="button">
          Add Todo
        </button>
      </div>
    `;
  }

  onClick() {
    // Add a new todo item when the button is clicked
    const newTodo = {
      id: this.todos.length + 1,
      title: `New Todo ${this.todos.length + 1}`,
    };

    this.mutation.mutate(newTodo);
  }
}

window.customElements.define("my-element", MyElement);
