import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MtxGridColumn } from '@ng-matero/extensions';
import { ChapterModel } from './model/chapter-interface';
import { EditChaptersComponent } from './edit-chapters/edit-chapters.component';
import { AddTopicComponent } from './add-topic/add-topic.component';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss']
})
export class ChaptersComponent implements OnInit {

  columns: MtxGridColumn[] = [
    { header: 'Subject Name', field: 'subjectName', sortable: true, },
    { header: 'Icon', field: 'chapterIcon', type: 'image'},
    { header: 'Chapter Code', field: 'chapterCode', sortable: true, },
    { header: 'Chapter Name', field: 'chapterName', sortable: true, },
    { header: 'Status', field: 'isActive', sortable: true, type: 'tag',
    tag: {
      true: { text: 'Active', color: 'green-100' },
      false: { text: 'In-Active', color: 'red-100' },
    } },
    {
      header: 'Operation',
      field: 'operation',
      width: '160px',
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
          popTitle: 'Are you sure want to delete chapter ?',
          click: record => this.delete(record),
        },
        {
          icon: 'add_circle_outline',
          tooltip: 'Add Subject',
          type: 'icon',
          click: record => this.add(record),
        },
      ],
    },
  ];

  list: ChapterModel[] = [
    {
        subjectName: 'Subject1',
        chapterId: 1,
        chapterCode: 'chapterCode1',
        chapterName: 'chapterName1',
        chapterIcon: 'https://i.picsum.photos/id/283/200/200.jpg?hmac=Qyx_FaWqQPrmQrGhQNKh2t2FUuwTiMNTS1VCkc86YrM',
        isActive: true
    },
    {
      subjectName: 'Subject2',
      chapterId: 2,
      chapterCode: 'chapterCode2',
      chapterName: 'chapterName2',
      chapterIcon: 'https://i.picsum.photos/id/104/200/200.jpg?hmac=3XxEVXVjwoI45-6sum_iMwNZ52GT-SJacVWr4fh4hqI',
      isActive: false
    }
  ];
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
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  edit(record) {
    this.dialog.open(EditChaptersComponent, {
      data: record,
      disableClose: true
    });
  }

  delete(record) {

  }
  add(record) {
    this.dialog.open(AddTopicComponent, {disableClose: true});
  }

}
