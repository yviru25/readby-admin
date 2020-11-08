import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddSubjectComponent>) { }

  ngOnInit(): void {
  }

  destroyDailog() {
    this.dialogRef.close();
  }

}
