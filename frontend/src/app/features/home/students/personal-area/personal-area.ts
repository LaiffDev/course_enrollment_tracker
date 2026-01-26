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
import { ɵInternalFormsSharedModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddHoursDialog } from './add-hours-dialog/add-hours-dialog';
import { ArchiveDialog } from './archive-dialog/archive-dialog';

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
  enrolledCourses: any[] = [];
  enrolled: any[] = [];

  constructor() {
    this.dataSource = new MatTableDataSource<CourseModel>([]);
  }

  ngOnInit() {
    this.loadAvailableCourses();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadAvailableCourses() {
    this.courseService.GetAvailableCourses().subscribe({
      next: (res) => {
        this.courses = res;
        this.loadEnrolledCourses();
      },
      error: (err) => console.error('Error loading courses:', err),
    });
  }

  loadEnrolledCourses() {
    this.courseService.StudentsEnrolledCourses().subscribe({
      next: (res) => {
        this.enrolled = res || [];

        this.enrolledCourses = this.courses
          .filter((course) => this.enrolled.some((e) => e.course_id === course.id))
          .map((course) => ({ ...course, logs: [] }));

        this.enrolledCourses.forEach((course) => this.loadCourseLogs(course));

        this.dataSource.data = [...this.enrolledCourses];
      },
      error: (err) => console.error('Error loading enrolled courses:', err),
    });
  }

  loadCourseLogs(course: any) {
    this.courseService.GetCourseStudyLogs(course.id).subscribe({
      next: (logs) => {
        course.logs = logs || [];
        this.dataSource.data = [...this.enrolledCourses]; // refresh table
      },
      error: (err) => console.error('Error loading course logs:', err),
    });
  }

  addStudiedHours(course: any) {
    const dialogRef = this.dialog.open(AddHoursDialog, { width: '400px', data: course });

    dialogRef.afterClosed().subscribe((payload) => {
      if (!payload) return;

      this.courseService.AttendanceHours(payload).subscribe({
        next: (res) => {
          if (!course.logs) course.logs = [];
          course.logs.push(res.log);
          this.dataSource.data = [...this.enrolledCourses];
        },
        error: (err) => console.error('Error saving studied hours:', err),
      });
    });
  }

  getStudiedHours(course: any): number {
    if (!course.logs || course.logs.length === 0) return 0;

    const totalHours = course.logs.reduce((sum: number, log: any) => sum + log.studied_hours, 0);
    return Math.min(totalHours, course.establishedTime);
  }

  showArchive(course: any) {
    const dialogRef = this.dialog.open(ArchiveDialog, { data: { course }, width: '600px' });
  }
}
