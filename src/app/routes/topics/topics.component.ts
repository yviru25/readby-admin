import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MtxGridColumn } from '@ng-matero/extensions';
import { TopicModel } from './model/topic-interface';
import { EditTopicComponent } from './edit-topic/edit-topic.component';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  columns: MtxGridColumn[] = [
    { header: 'Chapter Name', field: 'chapterName', sortable: true, },
    { header: 'Icon', field: 'topicIcon', type: 'image'},
    { header: 'Topic Code', field: 'topicCode', sortable: true, },
    { header: 'Topic Name', field: 'topicName', sortable: true, },
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
          popTitle: 'Are you sure want to delete topic ?',
          click: record => this.delete(record),
        }
      ],
    },
  ];

  list: TopicModel[] = [
    {
      chapterName: 'Chapter1',
      topicId: 1,
      topicCode: 'topicCode1',
      topicName: 'topicName1',
      topicIcon: 'https://i.picsum.photos/id/255/200/200.jpg?hmac=IYQV36UT5-F1dbK_CQXF7PDfLfwcnwKijqeBCo3yMlc',
      isActive: true
    },
    {
      chapterName: 'Chapter2',
      topicId: 2,
      topicCode: 'topicCode2',
      topicName: 'topicName2',
      topicIcon: 'https://i.picsum.photos/id/488/200/200.jpg?hmac=V8mvdG1ON09kNw80-qS00BSFq5gGhqRYoYPJftrsYA8',
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
    this.dialog.open(EditTopicComponent, {
      data: record,
      disableClose: true
    });
  }

  delete(record) {

  }
}
