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

  readonly $candidates = this.store.candidates;
  readonly $requisitionData = this.store.requisitionData;
  readonly $workplaces = this.store.workplaces;
  readonly $filters = this.store.requestionsFilters;
  readonly $loading = this.store.isLoading;
  readonly $error = this.store.error;

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

  toggleRequisition(id: number, nextActive: boolean) {
    this.store.setError(null);
    this.client
      .updateRequisitionActive(id, nextActive)
      .pipe(
        switchMap(() => this.loadRequisitions(this.getRequestionsPayload(this.$filters()))),
        finalize(() => this.store.updateLoader(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        error: () => this.store.setError('Something went wrong while updating requisition.'),
      });
  }

  private loadRequisitions(filters: RequestionsPayload) {
    this.store.updateLoader(true);
    this.store.setError(null);
    return this.client.getRequisitions(filters).pipe(
      tap((requisitions) => this.store.updateRequisitions(requisitions)),
      finalize(() => this.store.updateLoader(false)),
    );
  }

  private getRequestionsPayload(filters: RequestionsFilters) {
    const { status, location, role, workplace } = filters;
    return {
      status: status,
      location: location.value,
      role: role.value,
      workplace: workplace.value,
    };
  }
}
