import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private http = inject(HttpClient);

  RegisterUser(userData: UserModel) {
    return this.http.post(`${environment.apiUrl}/users/register`, userData);
  }

  LoginUser(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/users/login`, { email, password });
  }
}
