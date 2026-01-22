import { Component, inject, ViewChild } from '@angular/core';
import { Header } from '../../components/header/header';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CourseModel } from '../../shared/models/course-model';
import { CourseService } from '../../shared/services/course-service';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../shared/models/user-model';
import { UserService } from '../../shared/services/user-service';

@Component({
  selector: 'app-home',
  imports: [
    Header,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    CommonModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  //table configs
  displayedColumns: string[] = [
    'id',
    'titolo',
    'descrizione',
    'istruttore',
    'stato',
    'previste',
    'pubblicato',
    'cta',
  ];
  dataSource!: MatTableDataSource<CourseModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //dependecies
  courseService = inject(CourseService);
  userService = inject(UserService);

  //variables
  courses: CourseModel[] = [];
  users: UserModel[] = [];
  role: string | null = null;

  constructor() {
    this.dataSource = new MatTableDataSource<CourseModel>(this.courses);
  }

  ngOnInit() {
    console.log('home page mounted');
    this.getAllCoursesForStudent();
    this.getUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //get all users
  getUsers() {
    this.userService.GetAllUsers().subscribe({
      next: (res: any) => (this.users = res),
      error: (err) => {
        console.error('Errore nel recupero degli utenti : ', err);
      },
    });
  }

  //get all available courses for students
  getAllCoursesForStudent() {
    this.courseService.GetCoursesForStudent().subscribe({
      next: (res) => {
        this.courses = res.map((course) => ({
          ...course,
          instructorName: this.getInstructor(course.instructor_id),
        }));
        this.dataSource.data = this.courses;
      },
      error: (err) => {
        console.error('Errore nel recupero dei corsi : ', err);
      },
    });
  }

  //get all courses created by a specific teacher
  getAllCoursesForInstructor() {}

  //get the name of the instructor
  getInstructor(instructorId: number) {
    const instructor = this.users.find((user: any) => user.id == instructorId);
    return instructor?.fullname;
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
