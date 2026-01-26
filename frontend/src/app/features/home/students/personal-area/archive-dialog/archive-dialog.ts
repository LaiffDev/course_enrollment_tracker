import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseService } from '../../../../../shared/services/course-service';
import { CourseModel } from '../../../../../shared/models/course-model';

@Component({
  selector: 'app-archive-dialog',
  imports: [],
  templateUrl: './archive-dialog.html',
  styleUrl: './archive-dialog.css',
})
export class ArchiveDialog {
  data = inject(MAT_DIALOG_DATA);
  courseService = inject(CourseService);

  course!: CourseModel;
  logs: any;

  ngOnInit() {
    this.course = this.data.course;
    this.viewCourseLogs(this.course);
  }

  viewCourseLogs(course: any) {
    this.courseService.GetCourseStudyLogs(course.id).subscribe({
      next: (res) => {
        course.logs = res || [];
        course.totalHours = res?.reduce(
          (sum: number, log: any) => sum + (log.studied_hours || 0),
          0,
        );

        this.logs = res;
      },
      error: (err) => console.error(err),
    });
  }
}
