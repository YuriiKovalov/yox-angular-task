import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';

import {
  CandidateStat,
  RequestionsPayload,
  RequisitionData,
  WorkplacesSummary,
} from '../models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class DashboardClient {
  private http = inject(HttpClient);

  getCandidates() {
    return this.http.get<CandidateStat[]>('/api/candidates');
  }

  getRequisitions(filters: RequestionsPayload) {
    return this.http.get<RequisitionData>('/api/requisitions', {
      params: {
        status: filters.status,
        location: filters.location,
        role: filters.role,
        workplace: filters.workplace,
      },
    });
  }

  getWorkplaces() {
    return this.http.get<WorkplacesSummary>('/api/workplaces');
  }

  updateRequisitionActive(id: number, active: boolean) {
    return this.http.put(`/api/requisitions/${id}`, { active });
  }

  getDashboardData(filters: RequestionsPayload) {
    return forkJoin({
      candidates: this.getCandidates(),
      requisitions: this.getRequisitions(filters),
      workplaces: this.getWorkplaces(),
    });
  }
}
