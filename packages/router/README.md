# Router

A lightweight, TypeScript-based client-side router for single-page applications
(SPAs). This router provides essential routing functionality with support for
both intuitive string-based patterns (e.g., `/users/:id`) and powerful regular
expressions. It integrates with the browser's History API for seamless
navigation.

## Features

- 🎯 **String-Based Routing** - Define routes with named parameters (e.g.,
  `/posts/:id`).
- 💪 **RegExp-Based Routing** - Use regular expressions for complex and flexible
  pattern matching.
- 🔄 **History API Support** - Smooth, native browser back/forward navigation.
- 🎨 **TypeScript Support** - Full type safety and IntelliSense for a better
  developer experience.
- 📦 **Lightweight** - Minimal and dependency-free.
- 🔧 **Configurable Root Path** - Ideal for applications hosted in
  subdirectories.
- 📢 **Route Change Callbacks** - Hook into navigation events to update your UI.

## Installation

Since this is a standalone module, you can import it directly into your project.

```typescript
import Router, { RouteContext } from "./router";
```

## Basic Usage

### 1. Creating a Router Instance

```typescript
// Basic router
const router = new Router();

// For an app hosted at "https://example.com/my-app/"
const routerWithRoot = new Router({ root: "/my-app" });
```

### 2. Adding Routes

Routes are matched in the order they are added. The first match wins.

```typescript
// Simple string-based route
router.add("/about", (context) => {
  console.log("About page");
});

// Route with named parameters
router.add("/users/:id", (context) => {
  const { id } = context.param() as { id: string };
  // Or access a single parameter
  // const id = context.param('id') as string;
  console.log(`User page for ID: ${id}`);
});

// Route with multiple parameters
router.add("/posts/:id/comments/:comment_id", (context) => {
  const params = context.param() as { id: string; comment_id: string };
  console.log(`Post: ${params.id}, Comment: ${params.comment_id}`);
});

// Catch-all route for 404 pages (must be added last)
router.add(() => {
  console.log("404 - Page not found");
});
```

### 3. Navigation

```typescript
// Navigate to a route
router.navigate("/users/123");

// Navigate to the root
router.navigate("/");
```

The router automatically listens for browser back/forward button clicks.

### 4. Handling Route Changes

You can execute code whenever a route changes, which is useful for updating your
application's main view.

```typescript
router.onRouteChange(() => {
  console.log("Route changed to:", router.path);
  // e.g., renderAppView();
});
```

## API Reference

### `RouteContext` Class

An instance of `RouteContext` is passed to every route handler.

#### `param(key?: string): string | Record<string, string>`

- If `key` is provided, returns the value of the specified URL parameter.
- If `key` is omitted, returns an object containing all URL parameters.

#### `path: string`

The matched path fragment.

#### `params: Record<string, string>`

An object containing the matched URL parameters.

---

### `Router` Class

#### `new Router(options?: { root?: string })`

Creates a new router instance.

- `options.root`: The base path for the application (defaults to `/`).

#### `add(path: string | RegExp | RouteHandler, handler?: RouteHandler): Router`

Adds a new route.

- `path`: A string pattern (e.g., `/users/:id`), a `RegExp`, or a `RouteHandler`
  for a catch-all route.
- `handler`: A function that receives a `RouteContext` object.

#### `navigate(path: string = ""): Router`

Programmatically navigates to a new path and triggers the corresponding route
handler.

#### `check(fragment?: string): any`

Manually triggers a check against the routes. This is called automatically on
navigation.

- `fragment`: An optional path to check against (defaults to the current URL).

#### `onRouteChange(callback: () => void): Router`

Registers a callback to be executed after a route change.

#### `path: string` (getter)

Returns the current full path, including the root.

## Advanced Example: RegExp Route

For complex scenarios, you can still use regular expressions. The handler
signature remains the same.

```typescript
// Matches /items/ followed by a number, e.g., /items/42
router.add(/^\/items\/(\d+)$/, (context) => {
  // The captured group from the RegExp is not automatically named.
  // You would need to handle the `match` array manually if needed,
  // but string-based routes are preferred for simplicity.
  console.log("RegExp route matched:", context.path);
});
```

## Integration with Web Components (Lit Example)

Here's a simple example showing how to use the router in a Lit component:

```typescript
import { html, LitElement } from "lit";
import Router, { RouteContext } from "./router";

export class MyApp extends LitElement {
  private router = new Router();
  private currentView = html`
    <div>Loading...</div>
  `;

  constructor() {
    super();

    // Setup routes
    this.router
      .add("/", () => {
        this.currentView = html`
          <h1>Home</h1>
        `;
      })
      .add("/about", () => {
        this.currentView = html`
          <h1>About</h1>
        `;
      })
      .add("/users/:id", (context: RouteContext) => {
        const id = context.param("id");
        this.currentView = html`
          <h1>User ${id}</h1>
        `;
      })
      .onRouteChange(() => this.requestUpdate());

    this.router.check();
  }

  connectedCallback() {
    super.connectedCallback();

    // Handle link clicks
    this.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A") {
        const href = target.getAttribute("href");
        if (href?.startsWith("/")) {
          e.preventDefault();
          this.router.navigate(href);
        }
      }
    });
  }

  render() {
    return html`
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/users/123">User 123</a>
      </nav>
      <main>${this.currentView}</main>
    `;
  }
}

customElements.define("my-app", MyApp);
```

**Key concepts:**

- Store a `currentView` property that gets updated by route handlers
- Call `this.requestUpdate()` in `onRouteChange()` to trigger re-renders
- Intercept link clicks to use `router.navigate()` instead of page reloads
