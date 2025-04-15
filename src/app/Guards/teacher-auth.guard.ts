import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserDataService } from '../Services/user-data.service';

export const teacherAuthGuard: CanActivateFn = (route, state) => {
   const router = inject(Router);
  const authService = inject(UserDataService); // Assuming AuthService is properly provided

  if (localStorage.getItem("role")=='Teacher' && localStorage.getItem("token") != null) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
