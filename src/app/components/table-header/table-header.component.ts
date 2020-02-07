import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-table-header]',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
  host: {'class': 'movie-table__header'}
})
export class TableHeaderComponent implements OnInit {

  @Input() columns: string[];

  constructor() { }

  ngOnInit() {
  }

}
