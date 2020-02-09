import { Component, OnInit, Input } from '@angular/core';
import { TableService } from '../../services/table.service';

@Component({
  selector: '[app-table-header]',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
  host: {'class': 'movie-table__header'}
})
export class TableHeaderComponent implements OnInit {

  @Input() columns: string[];
  @Input() sortRows: (key: string) => {};

  constructor() { }

  ngOnInit() {
  }

}
