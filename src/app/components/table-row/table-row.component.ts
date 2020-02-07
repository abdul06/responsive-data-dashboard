import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../models/Movie';

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss'],
  host: {'class': 'movie-table__row'}
})
export class TableRowComponent implements OnInit {
  @Input() movie: Movie;
  @Input() columns: string[];

  constructor() { }

  ngOnInit() {
  }

}
