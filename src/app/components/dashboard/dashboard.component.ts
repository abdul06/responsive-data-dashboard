import { Component, OnInit, Input } from '@angular/core';
import { Dashboard } from 'src/app/models/Dashboards';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input() dashboard: Dashboard;

  constructor() { }

  ngOnInit() {
  }

}
