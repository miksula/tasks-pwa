import { html, LitElement } from "lit";
import {
  MutationObserver,
  QueryClient,
  QueryObserver,
} from "@tanstack/query-core";
import { getTodos, postTodo } from "./my-api/index.js";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Data becomes stale immediately
    },
  },
});

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static get properties() {
    return {
      todos: { state: true },
    };
  }

  constructor() {
    super();
    this.todos = [];
  }

  connectedCallback() {
    super.connectedCallback();

    // Create a QueryObserver
    this.query = new QueryObserver(queryClient, {
      queryKey: ["todos"],
      queryFn: getTodos,
    });

    // Subscribe to results
    this.querySubscription = this.query.subscribe((result) => {
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
    this.mutationSubscription = this.mutation.subscribe((result) => {
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
