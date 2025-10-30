import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MockApi } from './core/api/mock-api';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { errorSimulatorInterceptor } from './core/interceptors/error-simulator.interceptor';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorSimulatorInterceptor]), withInterceptorsFromDi()),
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(MockApi, { delay: 1000 })),
  ],
};

export const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoieXVyaWk3NyIsImEiOiJjbWhidXQ1NmcwNmwyMmxzODl5enBtZ2VoIn0.0qwzBKtK74U1qL2zVezOCQ';
