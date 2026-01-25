import { Component, inject, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { CourseService } from '../../shared/services/course-service';
import { CommonModule } from '@angular/common';
import { Studenti } from './students/studenti';
import { CourseModel } from '../../shared/models/course-model';
import { Instructors } from './instructors/instructors';
import { UserModel } from '../../shared/models/user-model';

@Component({
  selector: 'app-home',
  imports: [Header, CommonModule, Studenti, Instructors],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  courseService = inject(CourseService);

  courses: CourseModel[] = [];

  user!: UserModel;

  ngOnInit() {
    if (localStorage !== undefined) {
      this.user = JSON.parse(localStorage.getItem('user') || 'null');
    }

    this.availableCourses();
  }

  availableCourses() {
    this.courseService.GetAvailableCourses().subscribe({
      next: (res) => {
        this.courses = res;
      },
      error: (err) => {
        console.error('Errore nel recupero dei corsi : ', err);
      },
    });
  }
}
