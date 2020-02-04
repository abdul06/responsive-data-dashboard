import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../../models/Dashboards';
@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {

  dashboards:Dashboard[];
  constructor() { }

  ngOnInit() {
  }

}
