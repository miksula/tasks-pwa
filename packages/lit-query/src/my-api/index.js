export const todos = [
  { id: 1, title: "Buy groceries" },
  { id: 2, title: "Walk the dog" },
  { id: 3, title: "Write code" },
];

// Mock API functions

export const getTodos = () => {
  console.log("getTodos called");
  // Simulate API call with potential error
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 10% chance of error for demonstration
      if (Math.random() < 0.1) {
        reject(new Error("Failed to fetch todos"));
      } else {
        resolve(todos);
      }
    }, 1000);
  });
};

export const postTodo = (newTodo) => {
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
