import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  host: {'class': 'movies-table'}
})
export class TableComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
