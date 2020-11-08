import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-chapter',
  templateUrl: './add-chapter.component.html'
})
export class AddChapterComponent implements OnInit {
  public imagePath;
  public imgURL: any;
  public message: string;
  constructor(public dialogRef: MatDialogRef<AddChapterComponent>) { }

  ngOnInit(): void {
  }

  destroyDailog() {
    this.dialogRef.close();
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
