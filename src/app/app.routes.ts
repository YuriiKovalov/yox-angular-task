import { Routes } from '@angular/router';

import { APP_ROUTES } from './core/constants/routes.constants';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: APP_ROUTES.dashboard,
  },
  {
    path: APP_ROUTES.dashboard,
    loadChildren: () =>
      import('./pages/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
  },
  {
    path: APP_ROUTES.workplaces,
    loadChildren: () =>
      import('./pages/workplaces/workplaces.routes').then((m) => m.WORKPLACES_ROUTES),
  },
];
