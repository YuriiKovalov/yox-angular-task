import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import {
  CandidateStat,
  Company,
  RequestionsFilters,
  Requisition,
  User,
  WorkplacesSummary,
} from '../models/dashboard.models';
import {
  REQUESTIONS_LOCATIONS,
  REQUESTIONS_ROLES,
  REQUESTIONS_STATUS,
  REQUESTIONS_WORKPLACES,
} from '../constants/requestions-filters.constants';

type State = {
  candidates: Array<CandidateStat>;
  requisitions: Array<Requisition>;
  workplaces: WorkplacesSummary | null;
  user: User | null;
  company: Company | null;
  requestionsFilters: RequestionsFilters;
};

const initialRequestionsFilters: RequestionsFilters = {
  status: REQUESTIONS_STATUS[0],
  location: REQUESTIONS_LOCATIONS[0],
  role: REQUESTIONS_ROLES[0],
  workplace: REQUESTIONS_WORKPLACES[0],
};

const initialState: State = {
  candidates: [],
  requisitions: [],
  workplaces: null,
  user: null,
  company: null,
  requestionsFilters: initialRequestionsFilters,
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
    updateRequestionsFilters(requestionsFilters: RequestionsFilters) {
      patchState(store, { requestionsFilters });
    },
  })),
);
