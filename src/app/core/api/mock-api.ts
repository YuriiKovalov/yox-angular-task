import { InMemoryDbService } from 'angular-in-memory-web-api';

import data from './mock.json';

export class MockApi implements InMemoryDbService {
  createDb() {
    const { user, company, candidates, requisitions, workplaces } = data;
    return { user, company, candidates, requisitions, workplaces };
  }
}
