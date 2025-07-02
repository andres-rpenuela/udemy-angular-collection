import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '@auth/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Inject the current `AuthService` and use it to get an authentication token:
  const token = inject(AuthService).token();

  console.log({ 'authInterceptor': token })
  // Clone the request to add the authentication header.
  const newReq = req.clone({    headers: req.headers.append('Authorization', `Bearer ${token}`) });

  return next(newReq);
};
