# Router

A lightweight, TypeScript-based client-side router for single-page applications
(SPAs). This router provides essential routing functionality with support for
regular expression-based route matching, programmatic navigation, and browser
history management.

## Features

- **RegExp-based routing** - Flexible pattern matching for complex routes
- **History API support** - Browser back/forward navigation
- **TypeScript support** - Full type safety and IntelliSense
- **Lightweight** - Minimal dependencies and small bundle size
- **Configurable root path** - Support for apps hosted in subdirectories
- **Route change callbacks** - Hook into navigation events

## Installation

```typescript
import Router from "./router";
```

## Basic Usage

### Creating a Router Instance

```typescript
// Basic router
const router = new Router();

// Router with custom root path (for apps in subdirectories)
const router = new Router({ root: "/my-app" });
```

### Adding Routes

```typescript
// Simple route with RegExp pattern
router.add(/^users$/, () => {
  console.log("Users page");
});

// Route with parameters
router.add(/^users\/(\d+)$/, (match, userId) => {
  console.log(`User page for ID: ${userId}`);
});

// Catch-all route (must be added last)
router.add(() => {
  console.log("404 - Page not found");
});
```

### Navigation

```typescript
// Navigate to a route
router.navigate("users");
router.navigate("users/123");

// Navigate to root
router.navigate("");

// Check current route manually
router.check();
```

### Route Change Events

```typescript
router.onRouteChange(() => {
  console.log("Route changed to:", router.path);
});
```

## API Reference

### Constructor

```typescript
new Router(options?: RouterOptions)
```

**Options:**

- `root?: string` - Base path for the application (default: `"/"`)

### Methods

#### `add(pattern: RegExp | RouteHandler, handler?: RouteHandler): Router`

Adds a new route to the router.

**Parameters:**

- `pattern` - RegExp pattern to match against the current path, or a handler
  function for catch-all routes
- `handler` - Function to execute when the route matches

**Returns:** Router instance for method chaining

#### `navigate(path: string = ""): Router`

Programmatically navigate to a new path.

**Parameters:**

- `path` - Target path (relative to root)

**Returns:** Router instance for method chaining

#### `check(fragment?: string): any`

Check and execute the handler for the current or provided path.

**Parameters:**

- `fragment` - Optional path fragment to check (defaults to current path)

**Returns:** Result of the matched route handler, or `null` if no match

#### `onRouteChange(callback: () => void): Router`

Register a callback to be executed after route changes.

**Parameters:**

- `callback` - Function to execute on route change

**Returns:** Router instance for method chaining

### Properties

#### `path: string` (getter)

Returns the current full path including the root.

## Advanced Examples

### Complex Route Patterns

```typescript
// Route with multiple parameters
router.add(/^posts\/(\d+)\/comments\/(\d+)$/, (match, postId, commentId) => {
  console.log(`Post ${postId}, Comment ${commentId}`);
});

// Optional parameters
router.add(/^products\/([^\/]+)(?:\/(\w+))?$/, (match, productId, variant) => {
  console.log(`Product: ${productId}, Variant: ${variant || "default"}`);
});

// Query parameters (handled in the route handler)
router.add(/^search$/, () => {
  const params = new URLSearchParams(location.search);
  const query = params.get("q");
  console.log(`Search query: ${query}`);
});
```

### Integration with Components

```typescript
class App {
  private router: Router;

  constructor() {
    this.router = new Router();
    this.setupRoutes();

    // Listen for route changes to update UI
    this.router.onRouteChange(() => {
      this.render();
    });

    // Initial route check
    this.router.check();
  }

  setupRoutes() {
    this.router
      .add(/^$/, () => this.showHome())
      .add(/^about$/, () => this.showAbout())
      .add(/^users\/(\d+)$/, (match, id) => this.showUser(id))
      .add(() => this.show404());
  }

  showHome() {/* render home component */}
  showAbout() {/* render about component */}
  showUser(id: string) {/* render user component */}
  show404() {/* render 404 component */}
}
```

### Link Handling

```typescript
// Handle link clicks for SPA navigation
document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const link = target.closest("a[href]") as HTMLAnchorElement;

  if (link && link.host === location.host) {
    e.preventDefault();
    const path = link.pathname.replace(router.root, "");
    router.navigate(path);
  }
});
```

## Browser Compatibility

This router uses the HTML5 History API and requires:

- Modern browsers (IE10+)
- `history.pushState()` support
- `popstate` event support

## Notes

- Routes are checked in the order they were added
- The first matching route wins
- Use catch-all routes (functions without patterns) as the last route for 404
  handling
- The router automatically handles browser back/forward navigation
- Query parameters are preserved but not parsed by the router itself

## TypeScript Support

The router is written in TypeScript and includes full type definitions. All
methods and options are properly typed for better development experience.

```typescript
import Router, { RouteHandler, RouterOptions } from "./router";
```
