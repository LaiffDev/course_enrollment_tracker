import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseModel } from '../../../../../shared/models/course-model';
import { CourseService } from '../../../../../shared/services/course-service';

@Component({
  selector: 'app-add-hours-dialog',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-hours-dialog.html',
  styleUrl: './add-hours-dialog.css',
})
export class AddHoursDialog {
  data = inject(MAT_DIALOG_DATA);
  courseService = inject(CourseService);
  dialogRef = inject(MatDialogRef);

  course!: CourseModel;

  StudentFormGroup = new FormGroup({
    studied_hours: new FormControl(this.data.studied_hours),
  });

  ngOnInit() {
    this.course = this.data;
    // console.log(this.course);
  }

  savePresence() {
    const payload = {
      studied_hours: this.StudentFormGroup.value.studied_hours,
      course_id: this.course.id,
    };

    this.dialogRef.close(payload);
  }
}
