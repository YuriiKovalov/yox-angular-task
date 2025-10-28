import { Component, inject } from '@angular/core';

import { DashboardFacade } from './facade/dashboard.facade';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private facade = inject(DashboardFacade);
}
