import { Routes } from '@angular/router';

import { APP_ROUTES } from './core/constants/routes.constants';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: APP_ROUTES.DASHBOARD,
  },
  {
    path: APP_ROUTES.DASHBOARD,
    loadChildren: () =>
      import('./pages/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
  },
  {
    path: APP_ROUTES.WORKPLACES,
    loadChildren: () =>
      import('./pages/workplaces/workplaces.routes').then((m) => m.WORKPLACES_ROUTES),
  },
];
