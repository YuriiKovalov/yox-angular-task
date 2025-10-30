import { SimpleModel } from '../models/common.models';
import { StatusValue } from '../models/common.types';

export const REQUESTIONS_STATUS: SimpleModel<StatusValue>[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

export const REQUESTIONS_LOCATIONS: SimpleModel<string>[] = [
  { value: 'all', label: 'All' },
  { value: 'Manhattan, New York City', label: 'Manhattan, New York City' },
];

export const REQUESTIONS_ROLES: SimpleModel<string>[] = [
  { value: 'all', label: 'All' },
  { value: 'Barista', label: 'Barista' },
  { value: 'Shift Manager', label: 'Shift Manager' },
  { value: 'Cleaner', label: 'Cleaner' },
];

export const REQUESTIONS_WORKPLACES: SimpleModel<string>[] = [
  { value: 'all', label: 'All' },
  { value: 'Starbucks on Broadway & Bond', label: 'Starbucks on Broadway & Bond' },
  { value: 'Starbucks on 14th & Sixth', label: 'Starbucks on 14th & Sixth' },
  { value: 'Starbucks on NYU 4th & Washington', label: 'Starbucks on NYU 4th & Washington' },
  { value: 'Starbucks on 7th Ave at Grove Street', label: 'Starbucks on 7th Ave at Grove Street' },
];
