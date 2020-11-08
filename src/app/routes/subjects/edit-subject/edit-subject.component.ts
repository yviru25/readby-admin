import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddCourseComponent } from 'app/routes/courses/add-course/add-course.component';
import { SubjectModel } from '../model/subject-interface';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.scss']
})
export class EditSubjectComponent implements OnInit {
  public imagePath;
  public imgURL: any;
  public message: string;
  subjectModel: SubjectModel;
  constructor(public dialogRef: MatDialogRef<AddCourseComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.subjectModel = data;
    this.imgURL = this.subjectModel.subjectIcon;
}

ngOnInit(): void {
}

destroyDailog() {
this.dialogRef.close();
}

onSubmit() {
console.log(this.subjectModel);
}

preview(files) {
  if (files.length === 0) {
    return;
  }

  const mimeType = files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    this.message = 'Only images are supported.';
    return;
  }

  const reader = new FileReader();
  this.imagePath = files;
  reader.readAsDataURL(files[0]);
  reader.onload = (_event) => {
    this.imgURL = reader.result;
  };
}

}
