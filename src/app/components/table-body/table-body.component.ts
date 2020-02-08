import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
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
  // Properties
  movies: Movie[];
  columns: string[];
  paginatedMovies: any[];
  isDataAvailable: boolean = false;
  
  // pagination: 
  // Used to import services

  constructor(private _dataService: DataService) { }

  // setup data on init
  ngOnInit() {
    this.columns = this._dataService.getColumns();
        
    this._dataService.getMovies().subscribe( movies => {
      this.movies = movies;
      this.paginatedMovies = this.setupPagination(this.movies, 10);
      this.isDataAvailable = true;
      console.log('this.paginatedPage',this.paginatedPage);
    });
  }

  // add to utility folder
  setupPagination(list:any[], itemNumber:number):any{
    let paginationObject = {};
    let itemList: any[] = [];
    let count: number = 0;
    let objectNumber: number = 1;
  
    
    for (let index = 0; index < list.length; index++) {
      
      // reset list to setup pagination list number
      if(count === itemNumber){
        // setup object item to 
        paginationObject[`${objectNumber}`] = itemList;

        // reset array and count
        count = 0;
        itemList = [];
        objectNumber++
      }
      itemList.push(list[index]);
      count++;
    }

    return paginationObject;
  }

}
