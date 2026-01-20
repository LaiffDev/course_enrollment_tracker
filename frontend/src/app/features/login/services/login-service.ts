import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { UserModel } from '../../../shared/models/user-model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);

  RegisterUser(userData: UserModel) {
    this.http.post(`${environment.apiUrl}/users/register`, userData);
  }

  SignIn(userData: UserModel) {
    this.http.post(`${environment.apiUrl}/users/login`, userData);
  }
}
