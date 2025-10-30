import { Injectable } from '@angular/core';
import { Company, User } from '../models/dashboard.models';

const USER_KEY = 'app.user';
const COMPANY_KEY = 'app.company';

const DEFAULT_USER: User = { name: 'Martin' };
const DEFAULT_COMPANY: Company = { name: 'AMREST BULGARIA LTD', brand: 'Starbucks' };

interface LocalStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private get storage(): LocalStore | null {
    try {
      return typeof globalThis !== 'undefined' && 'localStorage' in globalThis
        ? (globalThis.localStorage as unknown as LocalStore)
        : null;
    } catch {
      return null;
    }
  }

  getUser(): User {
    const store = this.storage;
    const raw = store?.getItem(USER_KEY);
    if (raw) return JSON.parse(raw) as User;
    this.setUser(DEFAULT_USER);
    return DEFAULT_USER;
  }

  setUser(user: User): void {
    const store = this.storage;
    store?.setItem(USER_KEY, JSON.stringify(user));
  }

  getCompany(): Company {
    const store = this.storage;
    const raw = store?.getItem(COMPANY_KEY);
    if (raw) return JSON.parse(raw) as Company;
    this.setCompany(DEFAULT_COMPANY);
    return DEFAULT_COMPANY;
  }

  setCompany(company: Company): void {
    const store = this.storage;
    store?.setItem(COMPANY_KEY, JSON.stringify(company));
  }
}
