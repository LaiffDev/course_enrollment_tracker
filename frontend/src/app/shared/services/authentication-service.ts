import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserModel } from '../models/user-model';
import { environment } from '../../../environments/environment.development';
import { tap } from 'rxjs';
import { AuthModel } from '../models/auth-model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private http = inject(HttpClient);

  user: AuthModel | null = null;

  RegisterUser(user: UserModel) {
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }

  LoginUser(email: string, password: string) {
    return this.http.post<AuthModel>(`${environment.apiUrl}/users/login`, { email, password }).pipe(
      tap((res) => {
        this.user = res;

        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.logged));
      }),
    );
  }
}
