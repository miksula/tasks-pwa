// Vanilla JavaScript Example: TanStack Query Basic Usage
// This example replicates the React example using core APIs:
// QueryClient, QueryObserver, and MutationObserver

import {
  MutationObserver,
  QueryClient,
  QueryObserver,
} from "@tanstack/query-core";

const todos = [
  { id: 1, title: "Buy groceries" },
  { id: 2, title: "Walk the dog" },
  { id: 3, title: "Write code" },
];

// Mock API functions (replace with your actual API calls)
const getTodos = () => {
  console.log("getTodos called");
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(todos);
    }, 1000);
  });
};

const postTodo = (newTodo) => {
  console.log("postTodo called with:", newTodo);
  // Add the new todo to the local array (simulating a backend insert)
  todos.push(newTodo);

  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(newTodo);
    }, 500);
  });
};

// Create a QueryClient (equivalent to creating the client in React)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Data becomes stale immediately
      cacheTime: 15 * 1000, // Cache for 15 seconds
    },
  },
});

// DOM elements (assuming you have these in your HTML)
const todoListElement = document.getElementById("todo-list");
const addTodoButton = document.getElementById("add-todo-button");
const statusElement = document.getElementById("status");

// Update the UI based on query result
const updateTodoList = (result) => {
  if (result.isLoading) {
    statusElement.textContent = "Loading...";
    todoListElement.innerHTML = "";
    return;
  }

  if (result.isError) {
    statusElement.textContent = `Error: ${result.error.message}`;
    todoListElement.innerHTML = "";
    return;
  }

  if (result.isSuccess && result.data) {
    statusElement.textContent = "Success!";
    todoListElement.innerHTML = result.data
      .map((todo) => `<li key="${todo.id}">${todo.title}</li>`)
      .join("");
  }
};

// Create a QueryObserver for the todos query
// This is equivalent to using useQuery in React
const todosObserver = new QueryObserver(queryClient, {
  queryKey: ["todos"],
  queryFn: getTodos,
});

// Subscribe to query updates
const unsubscribeQuery = todosObserver.subscribe((result) => {
  console.log("todosObserver - Query result:", result.status, result.data);
  updateTodoList(result);
});

// Create a MutationObserver for adding todos
// This is equivalent to using useMutation in React
const addTodoMutation = new MutationObserver(queryClient, {
  mutationFn: postTodo,
  onSuccess: (data) => {
    console.log("Mutation succeeded:", data);

    // Invalidate and refetch the todos query
    // This is equivalent to queryClient.invalidateQueries in React (invalidate and refetch)
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
  onError: (error) => {
    console.error("Mutation failed:", error);
  },
});

// Subscribe to mutation updates to show loading state
const unsubscribeMutation = addTodoMutation.subscribe((result) => {
  console.log("addTodoMutation - Mutation result:", result.status);

  if (result.isPending) {
    addTodoButton.disabled = true;
    addTodoButton.textContent = "Adding...";
  } else {
    addTodoButton.disabled = false;
    addTodoButton.textContent = "Add Todo";
  }
});

// Handle button click to add a new todo
addTodoButton?.addEventListener("click", () => {
  const newTodo = {
    id: Date.now(),
    title: "Do Laundry",
  };

  // Call mutate to execute the mutation
  // This returns a promise that resolves with the data
  addTodoMutation
    .mutate(newTodo)
    .then((data) => {
      console.log("Todo added successfully:", data);
    })
    .catch((error) => {
      console.error("Failed to add todo:", error);
    });
});

// Cleanup function (call this when you want to stop observing)
const cleanup = () => {
  unsubscribeQuery();
  unsubscribeMutation();
  queryClient.clear();
};

// Export cleanup for use in your app
export { cleanup, queryClient };
