import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CourseModel } from '../models/course-model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private http = inject(HttpClient);

  GetAvailableCourses() {
    return this.http.get<CourseModel[]>(`${environment.apiUrl}/api/courses/`);
  }

  GetTeacherCourses() {
    return this.http.get<CourseModel[]>(`${environment.apiUrl}/api/courses/teachers-courses`);
  }

  GetCourseDetails(courseId: any) {
    return this.http.get<any>(`${environment.apiUrl}/api/courses/course-details/${courseId}`);
  }

  CreateNewCourse(courseData: CourseModel) {
    return this.http.post<CourseModel>(`${environment.apiUrl}/api/courses/new-course`, courseData);
  }

  EnrollToCourse(enrollData: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/courses/enroll`, enrollData);
  }

  StudentsEnrolledCourses() {
    return this.http.get<any>(`${environment.apiUrl}/api/courses/courses-enrolled`);
  }

  AttendanceHours(attendanceData: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/courses/save-attendance`, attendanceData);
  }

  GetCourseStudyLogs(courseId: any) {
    return this.http.get<any>(`${environment.apiUrl}/api/courses/logs/${courseId}`);
  }
}
