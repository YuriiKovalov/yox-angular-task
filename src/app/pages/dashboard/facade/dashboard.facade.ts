import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { DashboardStore } from '../../../core/state/dashboard.store';
import { DashboardClient } from '../../../core/client/dashboard.client';

@Injectable()
export class DashboardFacade {
  private client = inject(DashboardClient);
  private store = inject(DashboardStore);

  $user = this.store.user;
  $company = this.store.company;
  $candidates = this.store.candidates;
  $requisitions = this.store.requisitions;
  $workplaces = this.store.workplaces;

  loadDashboardData() {
    return this.client.getDashboardData().pipe(
      tap((data) => {
        this.store.updateUser(data.user);
        this.store.updateCompany(data.company);
        this.store.updateCandidates(data.candidates);
        this.store.updateRequisitions(data.requisitions);
        this.store.updateWorkplaces(data.workplaces);
      }),
    );
  }
}
