import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

import data from './mock.json';

export class MockApi implements InMemoryDbService {
  createDb() {
    const { user, company, candidates, requisitions, workplaces } = data;
    return { user, company, candidates, requisitions, workplaces };
  }

  // Handle filtering for requisitions via query params
  get(reqInfo: RequestInfo) {
    const { collectionName, query, utils, url } = reqInfo;

    if (collectionName === 'requisitions') {
      const status = (query.get('status')?.[0] ?? 'active') as string;
      const location = (query.get('location')?.[0] ?? 'all') as string;
      const role = (query.get('role')?.[0] ?? 'all') as string;
      const workplace = (query.get('workplace')?.[0] ?? 'all') as string;

      const base = (data as any).requisitions;

      // First apply non-status filters for counts
      const itemsForCounts = base.items.filter((item: any) => {
        if (location !== 'all' && item.workplace?.location !== location) return false;
        if (role !== 'all' && item.role !== role) return false;
        if (workplace !== 'all' && item.workplace?.name !== workplace) return false;
        return true;
      });

      // Then apply status for visible items
      const items = itemsForCounts.filter((item: any) => {
        const shouldBeActive = status === 'active';
        return item.active === shouldBeActive;
      });

      const body = {
        active: itemsForCounts.filter((i: any) => i.active).length,
        inactive: itemsForCounts.filter((i: any) => !i.active).length,
        items,
      };

      return utils.createResponse$(() => ({
        status: 200,
        headers: reqInfo.headers,
        url,
        body,
      }));
    }

    return undefined; // fallback to default handling
  }
}
