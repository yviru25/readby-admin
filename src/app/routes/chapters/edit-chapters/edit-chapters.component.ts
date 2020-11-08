import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChapterModel } from '../model/chapter-interface';

@Component({
  selector: 'app-edit-chapters',
  templateUrl: './edit-chapters.component.html',
  styleUrls: ['./edit-chapters.component.scss']
})
export class EditChaptersComponent implements OnInit {

  public imagePath;
  public imgURL: any;
  public message: string;
  chapterModel: ChapterModel;
  constructor(public dialogRef: MatDialogRef<EditChaptersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.chapterModel = data;
    this.imgURL = this.chapterModel.chapterIcon;
}

ngOnInit(): void {
}

destroyDailog() {
this.dialogRef.close();
}

onSubmit() {
console.log(this.chapterModel);
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
