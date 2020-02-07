import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Movie } from '../../models/Movie';

@Component({
  selector: 'app-table-body',
  templateUrl: './table-body.component.html',
  styleUrls: ['./table-body.component.scss']
})
export class TableBodyComponent implements OnInit {

  movies: Movie[];
  // Used to import services
  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.getMovies().subscribe( movies => {
      this.movies = movies.slice(0,11);
      console.log(this.movies);
    });
  }

}
