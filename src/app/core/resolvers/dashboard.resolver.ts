import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { DashboardFacade } from '../../pages/dashboard/facade/dashboard.facade';
import { DashboardData } from '../models/dashboard.models';

export const DASHBOARD_RESOLVER: ResolveFn<DashboardData> = () => {
  return inject(DashboardFacade).loadDashboardData();
};
