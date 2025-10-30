import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import {
  CandidateStat,
  RequestionsFilters,
  RequisitionData,
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
  requisitionData: RequisitionData | null;
  workplaces: WorkplacesSummary | null;
  requestionsFilters: RequestionsFilters;
  isLoading: boolean;
  error: string | null;
};

const initialRequestionsFilters: RequestionsFilters = {
  status: REQUESTIONS_STATUS[0].value,
  location: REQUESTIONS_LOCATIONS[0],
  role: REQUESTIONS_ROLES[0],
  workplace: REQUESTIONS_WORKPLACES[0],
};

const initialState: State = {
  candidates: [],
  requisitionData: null,
  workplaces: null,
  requestionsFilters: initialRequestionsFilters,
  isLoading: false,
  error: null,
};

export const DashboardStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    updateRequisitions(requisitionData: RequisitionData) {
      patchState(store, { requisitionData });
    },
    updateWorkplaces(workplaces: WorkplacesSummary) {
      patchState(store, { workplaces });
    },
    updateCandidates(candidates: Array<CandidateStat>) {
      patchState(store, { candidates });
    },
    updateRequestionsFilters(requestionsFilters: RequestionsFilters) {
      patchState(store, { requestionsFilters });
    },
    updateLoader(isLoading: boolean) {
      patchState(store, { isLoading });
    },
    setError(error: string | null) {
      patchState(store, { error });
    },
  })),
);
