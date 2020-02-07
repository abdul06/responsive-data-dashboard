import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Movie } from '../../models/Movie';

@Component({
  selector: '[app-table-body]',
  templateUrl: './table-body.component.html',
  styleUrls: ['./table-body.component.scss'],
  host: {'class': 'movie-table__body'}
})
export class TableBodyComponent implements OnInit {
  // Properties
  movies: Movie[];
  columns: string[];
  // Used to import services

  constructor(private _dataService: DataService) { }

  // setup data on init
  ngOnInit() {
    this.columns = this._dataService.getColumns();
        
    this._dataService.getMovies().subscribe( movies => {
      this.movies = movies.slice(0,11);
    });
  }

}
