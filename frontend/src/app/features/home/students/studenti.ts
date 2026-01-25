import { CommonModule } from '@angular/common';
import { Component, inject, input, Input, signal, SimpleChanges, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CourseModel } from '../../../shared/models/course-model';
import { Router, RouterModule } from '@angular/router';
import { CourseService } from '../../../shared/services/course-service';
import { UserModel } from '../../../shared/models/user-model';

@Component({
  selector: 'app-studenti',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './studenti.html',
  styleUrl: './studenti.css',
})
export class Studenti {
  router = inject(Router);
  courseService = inject(CourseService);

  //table configs
  displayedColumns: string[] = [
    'title',
    'description',
    'instructor_id',
    'status',
    'establishedTime',
    'published',
    'cta',
  ];
  dataSource!: MatTableDataSource<CourseModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() courses: CourseModel[] = [];

  //global variables
  user!: UserModel | any;
  enrolledCourseIds = new Set<number>();

  constructor() {
    this.dataSource = new MatTableDataSource<CourseModel>(this.courses);
  }

  ngOnInit() {
    if (localStorage !== undefined) {
      this.user = JSON.parse(localStorage.getItem('user') || 'null');
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['courses']) {
      this.courses = changes['courses'].currentValue;
      this.dataSource.data = this.courses;

      this.studentsEnrolledCourses();
    }
  }

  studentsEnrolledCourses() {
    this.courseService.StudentsEnrolledCourses().subscribe({
      next: (res) => {
        this.enrolledCourseIds = new Set(res.map((enroll: any) => enroll.course_id));
      },
    });
  }

  enrollToCourse(course: CourseModel) {
    const payload = {
      course_id: course.id,
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

  viewCourseDetails(courseId: CourseModel) {
    this.router.navigate(['/course-details', courseId]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
