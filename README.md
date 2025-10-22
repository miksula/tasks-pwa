# Tasks PWA - Deno Implementation

A progressive web application for task management built with Deno, featuring a modern full-stack architecture with API and web components.

## 🏗️ Project Structure

This is a monorepo workspace containing the following applications and packages:

### 📁 Directory Layout

```
use-deno/
├── apps/
│   ├── api/          # Hono-based REST API server
│   └── web/          # Lit-based frontend application
├── packages/
│   └── api-client/   # Shared API client library
├── deno.json         # Root Deno configuration
├── package.json      # Workspace configuration
└── README.md         
```

## 🚀 Applications

### API Server (`apps/api/`)
- **Framework**: [Hono](https://hono.dev/) - Lightweight web framework
- **Runtime**: Deno with Node.js compatibility layer (@hono/node-server)
- **Database**: SQLite with [Kysely](https://kysely.dev/) query builder
- **Logging**: Pino with structured logging
- **Validation**: Zod for schema validation
- **Features**:
  - RESTful API endpoints for task management
  - Request ID tracking and logging middleware
  - Environment configuration management
  - Database operations with type safety

**Key Dependencies**:
- `hono` - Web framework
- `kysely` - Type-safe SQL query builder
- `pino` - High-performance logging
- `zod` - Schema validation

### Web Application (`apps/web/`)
- **Framework**: [Lit](https://lit.dev/) - Lightweight web components
- **Build Tool**: [Vite](https://vitejs.dev/) - Modern build tooling
- **Authentication**: Auth.js integration
- **Styling**: Tailwind CSS via @tailwindplus/elements
- **State Management**: Immer for immutable state updates
- **Features**:
  - Progressive Web App capabilities
  - Component-based architecture with Lit Elements
  - Client-side routing
  - Local database with sync capabilities
  - Task management interface

**Key Dependencies**:
- `lit` - Web components framework
- `@auth/core` - Authentication
- `immer` - Immutable state updates
- `vite` - Build tool and dev server

## 🏛️ Architecture

### Backend Architecture
- **API Layer**: Hono framework with middleware pipeline
- **Database Layer**: Kysely ORM with SQLite
- **Logging**: Structured logging with Pino
- **Validation**: Zod schemas for request/response validation
- **Type Safety**: Full TypeScript integration

### Frontend Architecture
- **Component System**: Lit web components
- **State Management**: Custom store with Immer
- **Routing**: Client-side routing system
- **Database**: Local SQLite with remote sync capabilities
- **Build System**: Vite with TypeScript path mapping

### Data Schema
The application uses a simple todo/task schema:

```typescript
type TodoTable = {
  id: Generated<number>;
  text: string;
  completed: 0 | 1;
};
```

## 🔧 Development Setup

### Prerequisites
- [Deno](https://deno.land/) - Latest stable version

### Getting Started

1. **Install Dependencies**:
   ```bash
   # Install workspace dependencies
   deno install
   ```

2. **Start API Server**:
   ```bash
   cd apps/api
   deno task start
   # Server runs on http://localhost:8787
   ```

3. **Start Web Application**:
   ```bash
   cd apps/web
   deno run dev
   # Web app runs on http://localhost:5173
   ```

4. **Development Database Setup** (for web app):
   ```bash
   cd apps/web
   deno run dev:db:start
   ```

## 🛠️ Configuration

### Deno Configuration
- **Root**: Basic Deno configuration in `deno.json`
- **API**: Custom paths and tasks in `apps/api/deno.json`
- **Web**: Empty configuration, relies on Vite for build

### Build Configuration
- **Web Build Output**: Configured to build into `../api/public` for static serving
- **Proxy Setup**: Vite proxies `/api` requests to the Hono server
- **TypeScript Paths**: Configured for module resolution

## 📦 Package Management

This project uses a workspace setup with:
- **Root package.json**: Defines workspace structure
- **Individual app configs**: Each app has its own dependencies
- **Shared packages**: API client shared between apps

### Workspace Structure
```json
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

## 🚀 Deployment Considerations

- **API**: Can be deployed to any Deno-compatible platform
- **Web**: Static build output suitable for CDN deployment
- **Database**: LibSQL supports both local and cloud deployment via Turso
- **Environment**: Configure environment variables for production

## 🧩 Key Features

- **Type Safety**: Full TypeScript coverage across the stack
- **Modern Stack**: Latest web technologies and best practices
- **Performance**: Lightweight frameworks and optimized builds
- **Developer Experience**: Hot reload, structured logging, and clear separation of concerns
- **Scalability**: Monorepo structure supports team development and code sharing

## 📝 Notes

This implementation represents a migration to Deno while maintaining compatibility with existing Node.js tooling through workspace management and selective runtime usage.