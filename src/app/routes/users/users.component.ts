import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MtxGridColumn } from '@ng-matero/extensions';
import { UserModel } from './model/user-interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  columns: MtxGridColumn[] = [
    { header: 'User Name', field: 'userName', sortable: true, },
    { header: 'Name', field: 'firstName', sortable: true},
    { header: 'Email Id', field: 'email', sortable: true, },
    { header: 'Mobile No', field: 'mobileNo', sortable: true, },
    { header: 'Course Name', field: 'courseName', sortable: true, },
    { header: 'Course Year', field: 'courseYear', sortable: true, },
    { header: 'Course Stream', field: 'courseStream', sortable: true, },
    { header: 'Status', field: 'isActive', sortable: true, type: 'tag',
    tag: {
      true: { text: 'Active', color: 'green-100' },
      false: { text: 'In-Active', color: 'red-100' },
    } }
  ];

  list: UserModel[] = [
    {
      userId: 1,
      firstName: 'Aman',
      lastName: 'Jain',
      middleName: '',
      userName: 'aman.jain',
      email: 'aman@gmail.com',
      mobileNo: '9015287400',
      courseName: 'MBA',
      courseYear: '1',
      courseStream: 'HR',
      isActive: true
    },
    {
      userId: 2,
      firstName: 'Rakesh',
      lastName: 'Verma',
      middleName: 'Kumar',
      userName: 'rakesh.singh',
      email: 'rakesh@gmail.com',
      mobileNo: '9045234403',
      courseName: 'MBA',
      courseYear: '2',
      courseStream: 'Finance',
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

}
