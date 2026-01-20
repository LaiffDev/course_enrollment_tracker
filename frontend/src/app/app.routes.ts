import { Routes } from '@angular/router';
import { Login } from './features/login/login';

export const routes: Routes = [{ path: '', pathMatch: 'full', component: Login }];
