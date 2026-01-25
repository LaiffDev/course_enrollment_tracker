import { Component, inject, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from '../../../../shared/models/user-model';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormGroup,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CourseService } from '../../../../shared/services/course-service';

@Component({
  selector: 'app-create-course',
  imports: [
    MatFormFieldModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-course-dialog.html',
  styleUrl: './create-course-dialog.css',
})
export class CreateCourseDialog {
  readonly dialogRef = inject(MatDialogRef<CreateCourseDialog>);
  courseService = inject(CourseService);

  //global variables
  options = ['Disponibile', 'Non disponibile'];
  user: any;

  courseDataForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    establishedTime: new FormControl('', [Validators.required]),
    published: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    if (localStorage !== undefined) {
      this.user = JSON.parse(localStorage.getItem('user') || 'null');
    }
  }

  saveCourse() {
    const payload = {
      title: this.courseDataForm.value.title,
      description: this.courseDataForm.value.description,
      instructor_id: this.user.id,
      status: this.courseDataForm.value.status,
      establishedTime: this.courseDataForm.value.establishedTime,
      published: this.courseDataForm.value.published,
    };

    this.dialogRef.close(payload);
  }
}
