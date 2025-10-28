import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import {
  CandidateStat,
  Company,
  Requisition,
  User,
  WorkplacesSummary,
} from '../models/dashboard.models';

type State = {
  candidates: Array<CandidateStat>;
  requisitions: Array<Requisition>;
  workplaces: WorkplacesSummary | null;
  user: User | null;
  company: Company | null;
};

const initialState: State = {
  candidates: [],
  requisitions: [],
  workplaces: null,
  user: null,
  company: null,
};

export const DashboardStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    updateRequisitions(requisitions: Array<Requisition>) {
      patchState(store, { requisitions });
    },
    updateWorkplaces(workplaces: WorkplacesSummary) {
      patchState(store, { workplaces });
    },
    updateCandidates(candidates: Array<CandidateStat>) {
      patchState(store, { candidates });
    },
    updateUser(user: User) {
      patchState(store, { user });
    },
    updateCompany(company: Company) {
      patchState(store, { company });
    },
  })),
);
