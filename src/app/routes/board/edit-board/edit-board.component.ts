import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardModel } from '../model/board-interface';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.scss']
})
export class EditBoardComponent implements OnInit {

  boardModel: BoardModel;
  constructor(public dialogRef: MatDialogRef<EditBoardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.boardModel = data;
}

  ngOnInit(): void {
  }

  destroyDailog() {
  this.dialogRef.close();
  }

  onSubmit() {
  console.log(this.boardModel);
  }
}
