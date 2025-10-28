import { Routes } from '@angular/router';

import { Dashboard } from './dashboard';
import { DASHBOARD_PROVIDERS } from '../../core/providers/dashboard.providers';
import { DASHBOARD_RESOLVER } from '../../core/resolvers/dashboard.resolver';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: Dashboard,
    providers: DASHBOARD_PROVIDERS,
    resolve: [DASHBOARD_RESOLVER],
  },
];
