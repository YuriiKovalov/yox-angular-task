import { SimpleModel } from '../models/common.models';
import { StatusValue } from '../models/common.types';

export const REQUESTIONS_STATUS: SimpleModel<StatusValue>[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];
export const REQUESTIONS_LOCATIONS: SimpleModel<string>[] = [
  { value: 'location 1', label: 'Location 1' },
  { value: 'location 2', label: 'Location 2' },
  { value: 'location 3', label: 'Location 3' },
];
export const REQUESTIONS_ROLES: SimpleModel<string>[] = [
  { value: 'role 1', label: 'Role 1' },
  { value: 'role 2', label: 'Role 2' },
  { value: 'role 3', label: 'Role 3' },
];
export const REQUESTIONS_WORKPLACES: SimpleModel<string>[] = [
  { value: 'workplace 1', label: 'Workplace 1' },
  { value: 'workplace 2', label: 'Workplace 2' },
  { value: 'workplace 3', label: 'Workplace 3' },
];
