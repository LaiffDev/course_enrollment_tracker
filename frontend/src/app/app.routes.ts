import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Home } from './features/home/home';
import { Register } from './features/register/register';
import { CourseDetails } from './features/home/students/course-details/course-details';
import { PersonalArea } from './features/home/students/personal-area/personal-area';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Login },
  { path: 'homepage', component: Home },
  { path: 'register', component: Register },
  { path: 'course-details/:id', component: CourseDetails },
  { path: 'personal', component: PersonalArea },
];
