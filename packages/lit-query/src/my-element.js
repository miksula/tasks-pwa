import { html, LitElement } from "lit";

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
    this.todos = [
      { id: 1, title: "Buy groceries" },
      { id: 2, title: "Walk the dog" },
      { id: 3, title: "Write code" },
    ];
  }

  render() {
    return html`
      <div>
        <ul>
          ${this.todos.map((todo) => html`
            <li key=${todo.id}>${todo.title}</li>
          `)}
        </ul>
      
        <button @click="${this._onClick}" part="button">
          Add Todo
        </button>
      </div>
    `;
  }

  _onClick() {
    // Add a new todo item when the button is clicked
    const newTodo = {
      id: this.todos.length + 1,
      title: `New Todo ${this.todos.length + 1}`,
    };
    this.todos = [...this.todos, newTodo];
  }
}

window.customElements.define("my-element", MyElement);
