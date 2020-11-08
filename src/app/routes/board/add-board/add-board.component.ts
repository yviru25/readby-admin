import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.scss']
})
export class AddBoardComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddBoardComponent>) { }

  ngOnInit(): void {
  }

  destroyDailog() {
    this.dialogRef.close();
  }

}
