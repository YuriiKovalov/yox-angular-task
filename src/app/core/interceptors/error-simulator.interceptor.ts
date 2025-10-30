import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export const errorSimulatorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  if (req.method === 'PUT' && req.url.match(/\/api\/requisitions\//)) {
    return throwError(() => new HttpErrorResponse({ status: 500, statusText: 'Simulated error' }));
  }
  return next(req);
};
