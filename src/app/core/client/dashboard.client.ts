import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';

import {
  CandidateStat,
  Company,
  Requisition,
  User,
  WorkplacesSummary,
} from '../models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class DashboardClient {
  private http = inject(HttpClient);

  getUser() {
    return this.http.get<User>('/api/user');
  }

  getCompany() {
    return this.http.get<Company>('/api/company');
  }

  getCandidates() {
    return this.http.get<CandidateStat[]>('/api/candidates');
  }

  getRequisitions() {
    return this.http.get<Requisition[]>('/api/requisitions');
  }

  getWorkplaces() {
    return this.http.get<WorkplacesSummary>('/api/workplaces');
  }

  getDashboardData() {
    return forkJoin({
      user: this.getUser(),
      company: this.getCompany(),
      candidates: this.getCandidates(),
      requisitions: this.getRequisitions(),
      workplaces: this.getWorkplaces(),
    });
  }
}
