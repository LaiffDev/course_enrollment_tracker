import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CourseModel } from '../models/course-model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private http = inject(HttpClient);

  GetCoursesForStudent() {
    return this.http.get<CourseModel[]>(`${environment.apiUrl}/courses/`);
  }

  GetTeachersCourse() {
    return this.http.get<CourseModel[]>(`${environment.apiUrl}/courses/`);
  }
}
