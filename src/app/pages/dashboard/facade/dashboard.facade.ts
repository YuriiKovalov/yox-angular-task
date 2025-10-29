import { inject, Injectable, DestroyRef } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { finalize, switchMap, tap } from 'rxjs';
import { DashboardStore } from '../../../core/state/dashboard.store';
import { DashboardClient } from '../../../core/client/dashboard.client';
import { RequestionsFilters, RequestionsPayload } from '../../../core/models/dashboard.models';

@Injectable()
export class DashboardFacade {
  private readonly client = inject(DashboardClient);
  private readonly store = inject(DashboardStore);
  private readonly destroyRef = inject(DestroyRef);

  readonly $user = this.store.user;
  readonly $company = this.store.company;
  readonly $candidates = this.store.candidates;
  readonly $requisitions = this.store.requisitions;
  readonly $workplaces = this.store.workplaces;
  readonly $filters = this.store.requestionsFilters;
  readonly $loading = this.store.isLoading;

  constructor() {
    toObservable(this.store.requestionsFilters)
      .pipe(
        switchMap((filters) => this.loadRequisitions(this.getRequestionsPayload(filters))),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  loadDashboardData() {
    this.store.updateLoader(true);
    return this.client.getDashboardData(this.getRequestionsPayload(this.$filters())).pipe(
      tap((data) => {
        this.store.updateCandidates(data.candidates);
        this.store.updateRequisitions(data.requisitions);
        this.store.updateWorkplaces(data.workplaces);
      }),
    );
  }

  updateRequestionsFilters(filters: RequestionsFilters) {
    this.store.updateRequestionsFilters(filters);
  }

  private loadRequisitions(filters: RequestionsPayload) {
    this.store.updateLoader(true);
    return this.client.getRequisitions(filters).pipe(
      tap((requisitions) => this.store.updateRequisitions(requisitions)),
      finalize(() => this.store.updateLoader(false)),
    );
  }

  private getRequestionsPayload(filters: RequestionsFilters) {
    const { status, location, role, workplace } = filters;
    return {
      status: status.value,
      location: location.value,
      role: role.value,
      workplace: workplace.value,
    };
  }
}
