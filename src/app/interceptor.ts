import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Interceptor implements HttpInterceptor {
  constructor(private route: Router) {}
  errorMessage: string;
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorMessage = '';
        if (!(error.error instanceof ErrorEvent)) {
          if (error.status == 401) {
            localStorage.removeItem('token');
            this.route.navigate(['/log-utente']);
          }
        }
        return throwError(error);
      })
    );
  }
}
