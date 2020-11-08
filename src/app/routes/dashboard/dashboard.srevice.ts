import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashboardService {
  stats = [
    {
      title: 'Total Courses',
      value: '2',
      color: 'bg-indigo-500',
      iconName: 'courses'
    },
    {
      title: 'Total Subjects',
      value: '2',
      color: 'bg-blue-500',
      iconName: 'subjects'
    },
    {
      title: 'Total Chapters',
      value: '2',
      color: 'bg-blue-500',
      iconName: 'chapters'
    },
    {
      title: 'Total Topics',
      value: '2',
      color: 'bg-blue-500',
      iconName: 'topics'
    },
    {
      title: 'Total Users',
      value: '2',
      color: 'bg-blue-500',
      iconName: 'grpusers'
    }
  ];

  constructor(private http: HttpClient) {}

  getStats() {
    return this.stats;
  }
}
