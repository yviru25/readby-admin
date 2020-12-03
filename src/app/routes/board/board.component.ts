import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MtxGridColumn } from '@ng-matero/extensions';
import { BoardModel } from './model/board-interface';
import { AddBoardComponent } from './add-board/add-board.component';
import { EditBoardComponent } from './edit-board/edit-board.component';
import { ApiService } from '../../shared/services/api.services';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  columns: MtxGridColumn[] = [
    { header: 'Code', field: 'boardCode', sortable: true },
    { header: 'Name', field: 'boardName', sortable: true},
    { header: 'Status', field: 'isActive', sortable: true, type: 'tag',
    tag: {
      true: { text: 'Active', color: 'green-100' },
      false: { text: 'In-Active', color: 'red-100' },
    } },
    {
      header: 'Operation',
      field: 'operation',
      width: '140px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          icon: 'mode_edit',
          tooltip: 'Edit Course',
          type: 'icon',
          click: record => this.edit(record),
        },
        {
          icon: 'delete_forever',
          tooltip: 'Delete Course',
          color: 'warn',
          type: 'icon',
          pop: true,
          popTitle: 'Are you sure want to delete board ?',
          click: record => this.delete(record),
        }
      ],
    },
  ];

  list: BoardModel[];
  isLoading = true;
  multiSelectable = true;
  rowSelectable = true;
  hideRowSelectionCheckbox = false;
  showToolbar = true;
  columnHideable = true;
  columnMovable = true;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  boardList = [];
  constructor(public dialog: MatDialog, private service: ApiService) { }

  ngOnInit(): void {
    this.getBoardList();
  }

  getBoardList() {
    this.service.sendGetRequest('getBoardList').subscribe( (res) => {

        if (res.data) {
          // tslint:disable-next-line:prefer-for-of
          for (let index = 0; index < res.data.length; index++) {

                const json = {
                  boardId: res.data[index].BOARD_ID,
                  boardName: res.data[index].BOARD_NAME,
                  boardCode: res.data[index].BOARD_CODE,
                  isActive: res.data[index].IS_ACTIVE === 'T' ? true : false
                };
                this.boardList.push(json);
          }
        }
        this.list = this.boardList;
    });
  }

  edit(record: any) {
    this.dialog.open(EditBoardComponent, {
      data: record,
      disableClose: true
    });
  }

  delete(record: any) {
    console.log('delete methods call...');
  }

  addBoard() {
    this.dialog.open(AddBoardComponent, {
      disableClose: true
    });
  }

}
