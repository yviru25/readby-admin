import { Component, OnInit } from '@angular/core';
import { SubjectModel } from './model/subject-interface';
import { MtxGridColumn } from '@ng-matero/extensions';
import { MatDialog } from '@angular/material/dialog';
import { AddChapterComponent } from './add-chapter/add-chapter.component';
import { EditSubjectComponent } from './edit-subject/edit-subject.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  columns: MtxGridColumn[] = [
    { header: 'Course Name', field: 'courseName', sortable: true },
    { header: 'Icon', field: 'subjectIcon', type: 'image'},
    { header: 'Subject Code', field: 'subjectCode', sortable: true, },
    { header: 'Subject Name', field: 'subjectName', sortable: true, },
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
          popTitle: 'Are you sure want to delete subject ?',
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

  list: SubjectModel[] = [
    {
      courseName: 'Course1',
      subjectId: 1,
      subjectCode: 'subjectCode1',
      subjectName: 'subjectName1',
      subjectIcon: 'https://i.picsum.photos/id/283/200/200.jpg?hmac=Qyx_FaWqQPrmQrGhQNKh2t2FUuwTiMNTS1VCkc86YrM',
      isActive: true
    },
    {
      courseName: 'Course2',
      subjectId: 2,
      subjectCode: 'subjectCode2',
      subjectName: 'subjectName2',
      subjectIcon: 'https://i.picsum.photos/id/461/200/200.jpg?hmac=OfKixfjCbSjC-h3P78PbMNsJqVCnAClKqNmrUCONSw4',
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
    this.dialog.open(EditSubjectComponent, {
      data: record,
      disableClose: true
    });
  }

  delete(record) {

  }
  add(record) {
    this.dialog.open(AddChapterComponent, {disableClose: true});
  }

}
