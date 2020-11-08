import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TopicModel } from '../model/topic-interface';

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.scss']
})
export class EditTopicComponent implements OnInit {

  public imagePath;
  public imgURL: any;
  public message: string;
  topicModel: TopicModel;
  constructor(public dialogRef: MatDialogRef<EditTopicComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.topicModel = data;
    this.imgURL = this.topicModel.topicIcon;
}

ngOnInit(): void {
}

destroyDailog() {
this.dialogRef.close();
}

onSubmit() {
console.log(this.topicModel);
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
