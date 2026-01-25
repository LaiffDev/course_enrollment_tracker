import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../../../shared/services/course-service';
import { Header } from '../../../../components/header/header';
import { CourseModel } from '../../../../shared/models/course-model';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../../../shared/models/user-model';

@Component({
  selector: 'app-course-details',
  imports: [Header, CommonModule, RouterLink],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails {
  courseId: string | null = '';

  route = inject(ActivatedRoute);
  courseService = inject(CourseService);

  //global variables
  details!: CourseModel | any;
  user!: UserModel | any;
  enrolledCourseIds = new Set<number>();

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');

    if (typeof localStorage !== undefined) {
      this.user = JSON.parse(localStorage.getItem('user') || 'null');
    }
    this.getCourseDetails();
    this.studentsEnrolledCourses();
  }

  getCourseDetails() {
    this.courseService.GetCourseDetails(this.courseId).subscribe({
      next: (res) => {
        this.details = res;
      },
      error: (err) => {
        alert('Stai già frequentando questo corso');
        console.error('Errore nel recupero del corso : ', err);
      },
    });
  }

  studentsEnrolledCourses() {
    this.courseService.StudentsEnrolledCourses().subscribe({
      next: (res) => {
        this.enrolledCourseIds = new Set(res.map((enroll: any) => enroll.course_id));
      },
    });
  }

  enrollToCourse() {
    const payload = {
      course_id: this.courseId,
      user_id: this.user.id,
    };

    this.courseService.EnrollToCourse(payload).subscribe({
      next: (res) => {
        if (res) alert('Complimenti! Adesso inizia il tuo percorso');
        this.studentsEnrolledCourses();
      },
      error: (err) => {
        alert('Frequenti già questo corso');
        console.error("Errore nell'iscrizione : ", err);
      },
    });
  }
}
