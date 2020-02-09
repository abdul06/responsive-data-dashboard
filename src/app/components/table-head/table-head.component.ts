import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: '[app-table-head]',
  templateUrl: './table-head.component.html',
  styleUrls: ['./table-head.component.scss'],
  host: {'class': 'movie-table__head'}
})
export class TableHeadComponent implements OnInit {
  @Input() sortRows: (key: string) => {};

  columns: string[];
  // Used to import services
  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.columns = this._dataService.getColumns();
  }

}
