## YOX Angular Task

A small Angular app demonstrating dashboard features with filtering, mock API, error handling, and basic unit tests.

### Versions

- Angular: 20.3.x (CLI 20.3.7)
- Node: 20.x LTS (tested on v20)

### Setup and Run

```bash
# install
npm ci

# start dev server
npm run start
# or: ng serve

# run unit tests
npm test

# lint
npm run lint

# format
npm run format
```

The app runs at `http://localhost:4200/`.

### Project Structure

```text
src/
  app/
    core/                 # Application infrastructure (API, models, store, providers)
      api/                # Mock API and seed data
      client/             # API clients (dashboard)
      constants/          # Constants (routes, filters)
      interceptors/       # HTTP interceptors (error simulation)
      models/             # Domain models and types
      providers/          # Feature DI providers
      resolvers/          # Route resolvers (dashboard prefetch)
      services/           # General-purpose services (local storage)
      state/              # Signal store (dashboard.store)
    layout/               # App shell UI (header, side-bar)
    pages/
      dashboard/          # Dashboard page
        components/       # Widgets and tables related to Dashboard
        facade/           # Page facade for UI–data interaction
      workplaces/         # Workplaces placeholder page
    shared/               # Reusable building blocks
      components/         # Common components (controls, cards, nav)
      directives/         # Common directives
      features/           # Encapsulated features (e.g., map-gl)
      pipes/              # Common pipes
  assets/                 # Icons and images
  styles.scss             # Global styles
```

### Assumptions and Shortcuts

- Mock backend uses `angular-in-memory-web-api` with ~1s delay to simulate network latency.
- Error simulation: a custom HTTP interceptor returns 500 for `PUT /api/requisitions/:id` to showcase error state handling in the table.
-

### Notable Commands

- **Install**: `npm ci`
- **Run**: `npm run start` (or `ng serve`)
- **Test**: `npm test`
- **Lint**: `npm run lint`
- **Format**: `npm run format`

### What’s Covered by Tests

- `RequestionsTable` component: loading/empty/error/data states and toggle interaction calling the facade.
