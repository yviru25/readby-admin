import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseModel } from '../model/course-interface';
import { LocalStorageService } from '../../../shared/services/storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddCourseModel, MasCourseYear } from './model/course-model';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.services';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  @ViewChild('courseForm', {static: false}) courseForm: NgForm;
  courseModel: CourseModel;
  fileIcon: any;
  addCourseModel = {
    COURSE_CODE: '',
    COURSE_NAME: '',
    IS_ACTIVE: 't',
    COURSE_TYPE_ID: null,
    BOARD_ID: null,
    icon_path: 'c:/test',
    MAS_STREAM: [{
      STREAM_CODE: '',
      STREAM_NAME: '',
      IS_ACTIVE: ''
    }],
    MAS_COURSE_YEAR : [{
      YEAR: '',
      IS_ACTIVE: ''
    }]
  };
  addCourseEditModel = {
    COURSE_ID: null,
    COURSE_CODE: '',
    COURSE_NAME: '',
    IS_ACTIVE: 't',
    COURSE_TYPE_ID: null,
    BOARD_ID: null,
    icon_path: 'c:/test',
    MAS_STREAM: [{
      STREAM_ID: null,
      STREAM_CODE: '',
      STREAM_NAME: ''
    }],
    MAS_COURSE_YEAR : [{
      YEAR_ID: '',
      YEAR: '',
      DISPLAY_NAME: ''
    }]
  };
  isUpdate: boolean;
  courseTypeList = [];
  boardTypeList = [];
  courseYearList = [];
  masStreamList = [];
  masStreamAddList = [];
  courseYearAddList = [];
  serverResponse: any;
  imagePath: any;
  imgURL: string | ArrayBuffer;
  editedImagePath: string | ArrayBuffer;
  isImageUpdate = false;
  constructor(public dialogRef: MatDialogRef<AddCourseComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private localStorage: LocalStorageService,
              private spiner: NgxSpinnerService,
              private service: ApiService) {

              this.courseModel = data.selectedData;
              console.log(this.courseModel);
              this.isUpdate = data.isUpdate;
              if (this.isUpdate) {
                this.addCourseEditModel.COURSE_ID = data.selectedData.courseId;
                this.addCourseEditModel.COURSE_CODE = data.selectedData.courseCode;
                this.addCourseEditModel.COURSE_NAME = data.selectedData.courseName;
                this.addCourseEditModel.COURSE_TYPE_ID = data.selectedData.courseTypeId;
                this.addCourseEditModel.BOARD_ID = data.selectedData.boardId;
                this.addCourseEditModel.MAS_STREAM = data.selectedData.masCourse;
                this.addCourseEditModel.icon_path = data.selectedData.iconPath;
                this.imgURL = this.courseModel.iconPath;
                this.addCourseEditModel.MAS_COURSE_YEAR = data.selectedData.masCourseYear;
                console.log(this.addCourseEditModel);
              }
  }

  ngOnInit(): void {
    this.courseTypeList = this.localStorage.get('courseType');
    this.boardTypeList = this.localStorage.get('boardType');
    this.masStreamList = this.localStorage.get('MasStreamList');
    const masStreams = this.localStorage.get('MasStreamList');
    masStreams.forEach(element => {
         const json = {
          STREAM_CODE: element.STREAM_CODE,
          STREAM_NAME: element.STREAM_NAME
         };
         this.masStreamAddList.push(json);
    });
    this.courseYearList = this.localStorage.get('MasStreamYear');
    const masStreamsYears = this.localStorage.get('MasStreamYear');
    masStreamsYears.forEach(el => {
         const json = {
            YEAR: el.YEAR,
            DISPLAY_NAME: el.DISPLAY_NAME
         };
         this.courseYearAddList.push(json);
    });
    // console.log(this.courseYearAddList);
  }

  addCourse() {
    this.spiner.show();
    const formData: FormData = new FormData();
    this.getAddMasStreamName(this.addCourseModel.MAS_STREAM[0].STREAM_CODE, this.addCourseModel.MAS_COURSE_YEAR[0].YEAR);
    formData.append('file', this.fileIcon[0], this.fileIcon[0].name);
    formData.append('masCourse', JSON.stringify(this.addCourseModel));
    this.service.sendPostFormRequest('addCourses', formData).subscribe( (res: any) => {
      this.serverResponse = res;
      if (res === 'course added successfully') {
        this.destroyDailog();
        Swal.fire(
          'Success',
          'Course saved successfully.',
          'success'
        ).then( okay => {
          if (okay) {
            window.location.reload();
          }
      });
      }
      this.spiner.hide();
    }, (error) => {
        console.log(error);
        this.spiner.hide();
        if (error === 'Success') {
          this.destroyDailog();
          Swal.fire(
            'Success',
            'Course saved successfully.',
            'success'
          ).then( okay => {
            if (okay) {
              window.location.reload();
            }
        });
        } else {
          Swal.fire(
            error.split(',')[0],
            error.split(',')[1],
            'error'
          );
        }
    });
  }

  destroyDailog() {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.courseModel);
  }

  onFileSelected(event) {
    this.fileIcon = event.target.files;
    const reader = new FileReader();
    this.imagePath = this.fileIcon;
    // this.addCourseModel.icon_path = this.fileIcon;
    reader.readAsDataURL(this.fileIcon[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  onFileChange(event) {
    this.isImageUpdate = true;
    this.fileIcon = event.target.files;
    const reader = new FileReader();
    this.imagePath = this.editedImagePath;
    reader.readAsDataURL(this.fileIcon[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  editCousrse() {
    this.spiner.show();
    this.getEditMasStreamName(this.addCourseEditModel.MAS_STREAM[0].STREAM_CODE, this.addCourseEditModel.MAS_COURSE_YEAR[0].YEAR);
    const formData: FormData = new FormData();
    if (this.isImageUpdate) {
      formData.append('file', this.fileIcon[0], this.fileIcon[0].name);
    } else {
      formData.append('file', null);
    }
    formData.append('masCourse', JSON.stringify(this.addCourseEditModel));
    this.service.sendPostFormRequest('editCourses', formData).subscribe( (res: any) => {
      this.serverResponse = res;
      if (res === 'course added successfully') {
        this.destroyDailog();
        Swal.fire(
          'Success',
          'Course update successfully',
          'success'
        ).then( okay => {
          if (okay) {
            window.location.reload();
          }
      });
      }
      this.spiner.hide();
    }, (error) => {
        // console.log(error);
        this.spiner.hide();
        if (error === 'Success') {
          this.destroyDailog();
          Swal.fire('Success',
            'Course update successfully',
            'success').then( okay => {
              if (okay) {
                window.location.reload();
              }
          });
        } else {
          Swal.fire(
             error.split(',')[0],
             error.split(',')[1],
            'error'
          );
        }
    });
  }

  /* getMasStreamName(streamId: any, yearId: any) {
    console.log(streamId);
    this.addCourseModel.MAS_STREAM = this.masStreamList.filter( f => f.STREAM_ID === streamId);
    this.addCourseModel.MAS_COURSE_YEAR = this.courseYearList.filter( f => f.YEAR_ID === yearId);
  } */
  getAddMasStreamName(streamCode: any, year: any) {
    // console.log(streamCode + ' ' + +year);
    this.addCourseModel.MAS_STREAM = this.masStreamAddList.filter( f => f.STREAM_CODE === streamCode);
   // console.log(this.addCourseModel.MAS_STREAM);
    this.addCourseModel.MAS_COURSE_YEAR = this.courseYearAddList.filter( f => f.YEAR === year);
   // console.log(this.addCourseModel.MAS_COURSE_YEAR);
  }
  getEditMasStreamName(streamCode: any, year: any) {
    const streams = this.masStreamList.filter( f => f.STREAM_CODE === streamCode);
    this.addCourseEditModel.MAS_STREAM[0].STREAM_NAME = streams[0].STREAM_NAME;
    // console.log(this.addCourseEditModel.MAS_STREAM);
    // this.addCourseEditModel.MAS_COURSE_YEAR = this.courseYearList.filter( f => f.YEAR === year);
  }

}
