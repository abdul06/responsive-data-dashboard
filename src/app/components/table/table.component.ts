import { Component, OnInit, Input } from '@angular/core';
// import { DataService } from '../../services/data.service';

@Component({
  selector: '[app-table]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  host: {'class': 'movie-table'}
})
export class TableComponent implements OnInit {
  constructor() { }
  // Input properties
  @Input() paginatedPage:number;

  ngOnInit( ) {

    console.log('table.paginatedPage',this.paginatedPage);
  }

}
