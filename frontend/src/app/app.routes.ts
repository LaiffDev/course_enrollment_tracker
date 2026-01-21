import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Home } from './features/home/home';
import { Register } from './features/register/register';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Login },
  { path: 'homepage', component: Home },
  { path: 'register', component: Register },
];
