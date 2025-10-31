# lit-query

A demonstration package showcasing integration of [TanStack Query](https://tanstack.com/query) (formerly React Query) with [Lit](https://lit.dev/) web components for efficient data fetching and state management.

## Overview

This package demonstrates how to use TanStack Query Core with Lit web components to handle asynchronous data fetching, caching, and mutations without relying on React. It provides a clean pattern for managing server state in Lit applications.

## Features

- **TanStack Query Integration** - Leverage the power of TanStack Query Core with Lit
- **Reactive Updates** - Automatic re-rendering when query data changes
- **Smart Caching** - Built-in caching and automatic cache invalidation
- **Lightweight** - Minimal dependencies and small bundle size

## Usage

### Basic Query Example

The package includes a working example in `src/my-element.js` that demonstrates:

1. **Setting up QueryClient**:
```javascript
import { QueryClient, QueryObserver, MutationObserver } from "@tanstack/query-core";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Configure staleness
    },
  },
});
```

2. **Using QueryObserver in Lit Components**:
```javascript
export class MyElement extends LitElement {
  connectedCallback() {
    super.connectedCallback();

    // Create a QueryObserver
    this.query = new QueryObserver(queryClient, {
      queryKey: ["todos"],
      queryFn: getTodos,
    });

    // Subscribe to query results
    this.querySubscription = this.query.subscribe((result) => {
      if (result.data) {
        this.todos = result.data;
      }
      this.requestUpdate();
    });
  }
}
```

3. **Handling Mutations**:
```javascript
// Create a MutationObserver
this.mutation = new MutationObserver(queryClient, {
  mutationFn: postTodo,
  onSuccess: (data) => {
    // Invalidate and refetch queries after mutation
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
});

// Trigger mutation
this.mutation.mutate(newTodo);
```

### Key Patterns

#### Query Setup
- Use `QueryObserver` to observe query state
- Subscribe to query results in `connectedCallback()`
- Call `this.requestUpdate()` to trigger Lit re-renders
- Clean up subscriptions in `disconnectedCallback()` (recommended)

#### Mutations
- Use `MutationObserver` for data mutations (POST, PUT, PATCH, DELETE)
- Invalidate related queries in `onSuccess` callback
- TanStack Query automatically refetches invalidated queries

#### Data Flow
1. Component mounts → Subscribe to query
2. Query executes → Data returned
3. Update component state → Lit re-renders
4. Mutation triggered → Server updated
5. Query invalidated → Automatic refetch

## Project Structure

```
lit-query/
├── index.html              # Main HTML entry point
├── package.json            # Dependencies and scripts
├── src/
│   ├── my-element.js       # Main Lit component with TanStack Query
│   ├── index.css           # Global styles
│   └── my-api/
│       └── index.js        # Mock API functions
└── README.md
```

## Dependencies

- **[@tanstack/query-core](https://www.npmjs.com/package/@tanstack/query-core)** (^5.90.5) - Framework-agnostic query management
- **[lit](https://www.npmjs.com/package/lit)** (^3.3.1) - Simple, fast web components

## Why TanStack Query with Lit?

TanStack Query Core provides:
- **Automatic caching** - Reduces unnecessary network requests
- **Background refetching** - Keeps data fresh
- **Request deduplication** - Prevents duplicate requests
- **Optimistic updates** - Better UX during mutations
- **Error handling** - Built-in retry logic
- **Framework agnostic** - Works with any JavaScript framework

Combined with Lit's lightweight and efficient component model, you get a powerful solution for building data-driven web components.

## Example Use Cases

This pattern is ideal for:
- Building design systems with data-fetching components
- Creating reusable web components that need server data
- Progressive enhancement of existing applications
- Micro-frontends with shared component libraries

## Learn More

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Lit Documentation](https://lit.dev/)
- [Web Components MDN Guide](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

## License

Private package - not published to npm registry.

## Contributing

This is a demonstration package. Feel free to use the patterns shown here in your own projects!
