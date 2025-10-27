import { InMemoryDbService } from 'angular-in-memory-web-api';
import data from '../../../../mock/mock.json';

export class MockApi implements InMemoryDbService {
  createDb() {
    // ToDo: make interfaces
    const { user, company, candidates, requisitions, workplaces } = data;
    return { user, company, candidates, requisitions, workplaces };
  }
}
