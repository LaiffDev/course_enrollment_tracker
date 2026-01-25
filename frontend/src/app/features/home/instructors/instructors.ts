import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CourseModel } from '../../../shared/models/course-model';
import { CourseService } from '../../../shared/services/course-service';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CreateCourseDialog } from './create-course-dialog/create-course-dialog';
import { UserModel } from '../../../shared/models/user-model';

@Component({
  selector: 'app-instructors',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './instructors.html',
  styleUrl: './instructors.css',
})
export class Instructors {
  //dependecies
  courseService = inject(CourseService);
  readonly dialog = inject(MatDialog);

  //global variables
  courses: CourseModel[] = [];
  user: any[] = [];

  //table configs
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'status',
    'establishedTime',
    'published',
  ];
  dataSource!: MatTableDataSource<CourseModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource<CourseModel>(this.courses);
  }

  ngOnInit() {
    if (typeof localStorage !== undefined) {
      this.user = JSON.parse(localStorage.getItem('user') || 'null');
    }
    this.getTeachersCourses();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getTeachersCourses() {
    this.courseService.GetTeacherCourses().subscribe({
      next: (res) => {
        this.courses = res;
        this.dataSource.data = this.courses;
      },
    });
  }

  openCreateCourseDialog() {
    const dialogRef = this.dialog.open(CreateCourseDialog, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.courseService.CreateNewCourse(result).subscribe({
        next: (res) => {
          if (res) this.getTeachersCourses();
        },
        error: (err) => console.error('Errore : ', err),
      });
    });
  }

  //filtering to search for a specific course
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
