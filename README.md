# Tasks PWA

A web application for task management (Todo list) built with Deno, Hono, and
Lit. Features a monorepo structure with API server and web application sharing
TypeScript types.

## Getting Started

1. **Install Dependencies**:
   ```bash
   deno install
   ```

2. **Start Development**:
   ```bash
   # Start both database and web app
   deno task dev

   # Or start individually:
   deno task api      # API server on http://localhost:9999
   deno task web      # Web app on http://localhost:5173
   deno task web:db   # Local Turso database on http://localhost:8088
   ```

## Project Structure

```
├── apps/
│   ├── api/          # Hono REST API with LibSQL database
│   └── web/          # Lit web components with Vite
├── packages/
│   ├── api-client/   # Type-safe API client
│   ├── router/       # Client-side router
│   └── lit-query/    # Example: TanStack Query integration for Lit
├── deno.json         # Root tasks and configuration
└── package.json      # Workspace configuration
```

### API Server (`apps/api/`)

Hono-based REST API with LibSQL database, Kysely query builder, and Zod
validation. Runs on Deno runtime with structured Pino logging.

**Tech Stack**: Hono, Kysely, LibSQL, Zod, Pino

### Web Application (`apps/web/`)

Lit-based frontend with local LibSQL database and Auth.js authentication. Built
with Vite and uses workspace packages for routing and API client.

**Tech Stack**: Lit, Vite, @libsql/client, Auth.js, TailwindCSS

### Shared Packages

- **api-client**: Type-safe Hono client for API communication
- **router**: Lightweight client-side router with TypeScript
