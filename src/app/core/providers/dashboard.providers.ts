import { Provider } from '@angular/core';

import { DashboardFacade } from '../../pages/dashboard/facade/dashboard.facade';
import { DashboardStore } from '../state/dashboard.store';

export const DASHBOARD_PROVIDERS: Array<Provider> = [DashboardStore, DashboardFacade];
