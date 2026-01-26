import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CourseModel } from '../../../../../shared/models/course-model';
import { CourseService } from '../../../../../shared/services/course-service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-hours-dialog',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-hours-dialog.html',
  styleUrl: './add-hours-dialog.css',
})
export class AddHoursDialog {
  data = inject(MAT_DIALOG_DATA);
  courseService = inject(CourseService);
  dialogRef = inject(MatDialogRef);

  course!: CourseModel;

  StudentFormGroup = new FormGroup({
    studied_hours: new FormControl('', [Validators.required]),
    day_studied: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.course = this.data;
    // console.log(this.course);
  }

  savePresence() {
    const rawDate: any = this.StudentFormGroup.value.day_studied;

    const studied_date = new Date(rawDate).toISOString().split('T')[0];

    const payload = {
      studied_hours: this.StudentFormGroup.value.studied_hours,
      course_id: this.course.id,
      studied_date: studied_date,
    };

    this.dialogRef.close(payload);
  }
}
