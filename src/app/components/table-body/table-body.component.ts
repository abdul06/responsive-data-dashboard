import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../services/data.service';
import { TableService } from '../../services/table.service';
import { Movie } from '../../models/Movie';

@Component({
  selector: '[app-table-body]',
  templateUrl: './table-body.component.html',
  styleUrls: ['./table-body.component.scss'],
  host: {'class': 'movie-table__body'}
})
export class TableBodyComponent implements OnInit {
  // Input properties
  @Input() paginatedPage:number;
  @Input() paginatedRows:any[];
  @Input() columns: string[];
  // @Input() isDataAvailable: boolean;
  

  constructor(public _dataService: DataService, public _tableService: TableService) { }

  // setup data on init
  ngOnInit() {
  }


}
