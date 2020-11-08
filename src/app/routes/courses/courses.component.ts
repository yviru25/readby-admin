import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn } from '@ng-matero/extensions';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseComponent } from './add-course/add-course.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { CourseModel } from './model/course-interface';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  @ViewChild('statusCourse', { static: true }) statusCourse: TemplateRef<any>;
  columns: MtxGridColumn[] = [
    { header: 'Code', field: 'courseCode', sortable: true },
    { header: 'Name', field: 'courseName', sortable: true},
    { header: 'Year', field: 'courseYear', sortable: true, },
    { header: 'Stream', field: 'courseStream', sortable: true, },
    { header: 'Type', field: 'courseType', sortable: true },
    { header: 'Status', field: 'status', sortable: true, type: 'tag',
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
          popTitle: 'Are you sure want to delete course ?',
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

  list: CourseModel[] = [
    {
        courseId: 1,
        courseCode: 'MBA001',
        courseName: 'MBA',
        courseYear: 2,
        courseStream: 'Finance',
        courseType: 'Compitative',
        status: true
    },
    {
        courseId: 2,
        courseCode: 'Btech002',
        courseName: 'B-Tech',
        courseYear: 4,
        courseStream: 'CSE',
        courseType: 'Academic',
        status: false
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

  edit(record: any) {
    this.dialog.open(AddCourseComponent, {
      data: {
        selectedData: record,
        isUpdate: true
      },
      disableClose: true
    });
  }

  delete(record: any) {
    console.log('delete methods call...');
  }

  add(record: any) {
    this.dialog.open(AddSubjectComponent, {disableClose: true});
  }

  addCourse() {
    this.dialog.open(AddCourseComponent, {
      data: {
        selectedData: null,
        isUpdate: false
      },
      disableClose: true
    });
  }
}
