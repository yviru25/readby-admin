import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseModel } from '../model/course-interface';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  courseModel: CourseModel;
  isUpdate: boolean;
  constructor(public dialogRef: MatDialogRef<AddCourseComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

              this.courseModel = data.selectedData;
              this.isUpdate = data.isUpdate;
              console.log(this.courseModel);
  }

  ngOnInit(): void {
  }

  destroyDailog() {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.courseModel);
  }
}
