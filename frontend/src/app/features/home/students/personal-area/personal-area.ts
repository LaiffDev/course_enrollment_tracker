import { Component, inject, ViewChild } from '@angular/core';
import { Header } from '../../../../components/header/header';
import { CourseService } from '../../../../shared/services/course-service';
import { CourseModel } from '../../../../shared/models/course-model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormGroup, ɵInternalFormsSharedModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddHoursDialog } from './add-hours-dialog/add-hours-dialog';

@Component({
  selector: 'app-personal-area',
  imports: [
    Header,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    CommonModule,
    ɵInternalFormsSharedModule,
  ],
  templateUrl: './personal-area.html',
  styleUrl: './personal-area.css',
})
export class PersonalArea {
  courseService = inject(CourseService);
  dialog = inject(MatDialog);

  displayedColumns: string[] = [
    'title',
    'description',
    'instructor_id',
    'status',
    'establishedTime',
    'published',
    'studied_hours',
    'cta',
  ];
  dataSource!: MatTableDataSource<CourseModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  courses: CourseModel[] = [];
  enrolledCourses: CourseModel[] = [];
  enrolled: any;
  studiedHours: [] = [];

  constructor() {
    this.dataSource = new MatTableDataSource<CourseModel>(this.courses);
  }

  ngOnInit() {
    this.availableCourses();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  availableCourses() {
    this.courseService.GetAvailableCourses().subscribe({
      next: (res) => {
        this.courses = res;
        this.studentsEnrolledCourses();
      },
      error: (err) => {
        console.error('Errore nel recupero dei corsi : ', err);
      },
    });
  }

  studentsEnrolledCourses() {
    this.courseService.StudentsEnrolledCourses().subscribe({
      next: (res) => {
        this.enrolled = res;

        this.enrolled.forEach((res: any) => {
          this.courses.forEach((course) => {
            if (course.id == res.course_id) {
              this.enrolledCourses.push(course);
            }
          });
        });

        this.dataSource.data = this.enrolledCourses;
      },
    });
  }

  addStudiedHours(row: CourseModel) {
    const dialog = this.dialog.open(AddHoursDialog, { width: '400px', data: row });

    dialog.afterClosed().subscribe((payload) => {
      if (!payload) return;

      this.courseService.AttendanceHours(payload).subscribe({
        next: (res) => {
          const enrollment = this.enrolled.find((e: any) => e.course_id === row.id);
          if (enrollment) {
            enrollment.studied_hours = res.studied_hours;
          } else {
            this.enrolled.push({
              course_id: row.id,
              studied_hours: res.studied_hours,
            });
          }

          this.dataSource.data = [...this.dataSource.data];
        },
        error: (err) => console.error(err),
      });
    });
  }

  getStudiedHours(course: any): number {
    const enrollment = this.enrolled.find((enroll: any) => enroll.course_id === course.id);

    if (!enrollment) return 0;

    return Math.min(enrollment.studied_hours, course.establishedTime);
  }
}
