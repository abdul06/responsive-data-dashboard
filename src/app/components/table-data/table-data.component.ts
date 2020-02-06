import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Movie } from '../../models/Movie';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent implements OnInit {

  movies: Movie[];
  // Used to import services
  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.getMovies().subscribe( movies => {
      console.log(movies);
    });
  }

}
