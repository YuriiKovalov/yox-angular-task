import { SimpleModel } from './common.models';
import { StatusValue } from './common.types';

export interface User {
  name: string;
}

export interface Company {
  name: string;
  brand: string;
}

export interface CandidateStat {
  period: string;
  count: number;
  displayCount?: string;
  compareText: string | null;
  // ToDo: consider using enum
  compareType: 'increase' | 'decrease' | null;
  badge: number | null;
}

export interface WorkplaceLocation {
  name: string;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Shifts {
  active: number;
  available: number;
  inactive?: number;
}

export interface Requisition {
  id: number;
  active: boolean;
  role: string;
  status: string;
  // ToDo: consider using enum
  statusType: 'success' | 'warning' | 'error' | string;
  workplace: WorkplaceLocation;
  shifts: Shifts;
}

export interface WorkplacesSummary {
  currentActiveWorkplaces: number;
  totalWorkplaces: number;
  workplaces: WorkplaceLocation[];
}

export interface DashboardData {
  candidates: CandidateStat[];
  requisitions: Requisition[];
  workplaces: WorkplacesSummary;
}

export interface RequestionsFilters {
  status: SimpleModel<StatusValue>;
  location: SimpleModel<string>;
  role: SimpleModel<string>;
  workplace: SimpleModel<string>;
}

export interface RequestionsPayload {
  status: StatusValue;
  location: string;
  role: string;
  workplace: string;
}
