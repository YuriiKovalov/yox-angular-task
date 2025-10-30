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

### Assumptions and Demo Notes

- Mock backend uses `angular-in-memory-web-api` with ~1s delay to simulate network latency.
- Filters intentionally demonstrate state transitions: changing any filter reloads data and shows Loading (~1s); combining them to no matches shows Empty.
- Error simulation: clicking the on/off switch in the table (on/off column) issues `PUT /api/requisitions/:id` which is mocked to return 500, showing the Error state; adjust any filter to reload data afterwards.
- A route resolver is used on Dashboard to preload data so the page activates only after data is ready (a simple demonstration of this approach).
- Map controls: any Angular component can be mounted as a Mapbox control via a generic `IControl` adapter (`MapControlFactory`) that uses `ViewContainerRef.createComponent` and is exposed through `MapGlFacade.addControl`.

### Notable Commands

- **Install**: `npm ci`
- **Run**: `npm run start` (or `ng serve`)
- **Test**: `npm test`
- **Lint**: `npm run lint`
- **Format**: `npm run format`

### What’s Covered by Tests

- `RequestionsTable` component: loading/empty/error/data states and toggle interaction calling the facade.
