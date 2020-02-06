import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../../models/Dashboards';
@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {

  dashboards:Dashboard[];
  constructor() { }

  ngOnInit() {
    this.dashboards = [
      {
        id: 1,
        title: 'title_one',
        completed: false
      },
      {
        id: 2,
        title: 'title_two',
        completed: false
      },
      {
        id: 3,
        title: 'title_three',
        completed: false
      },
      {
        id: 4,
        title: 'title_four',
        completed: false
      },
    ]
  }

}
