import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { TableService } from '../../services/table.service';
import { setupPagination, sortByObjectValue } from '../../../utils/utils';
// import { Movie } from '../../models/Movie';

@Component({
  selector: '[app-table]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  host: {'class': 'movie-table'}
})
export class TableComponent implements OnInit {
  constructor(public _dataService: DataService, public _tableService: TableService) { }
  // Passed In properties
  // @Input() columns:any;
  // @Input() rows:any;
  // properties
  // movies: Movie[];
  paginatedPage:number = 1;
  paginatedRows: {
    rows: any[],
    start: string,
    end: string
  };
  columns:any;
  resultNumber: number = 0;
  startRange: number = this.paginatedPage;
  endRange: number = 10;



  // Methods

  public setPaginationState() {
      const pageItem = this._tableService.paginatedRows[`${this.paginatedPage}`];
      // repeated mutiple time setup as function
      this.paginatedRows = pageItem.groupedRows;
      this.startRange = pageItem.start;
      this.endRange = pageItem.end;
  }

  /**
   * goes to previous pagination items
   */
  public previous() {
    if(this.paginatedPage > 1){
      this.paginatedPage--;

      // update 
      this.setPaginationState();
    }
  }
  /**
   * goes to next pagination items
   */
  public next() {
    if(this._tableService.numberOfRows > 0 && this.paginatedPage < this._tableService.numberOfGroupedRows){
      this.paginatedPage++;

      // update 
      this.setPaginationState();
    }
  }


  ngOnInit() {
    // get movie api data
    this._dataService.getMovies().subscribe( movies => {

      // set service variables
      this._tableService.rows = movies
      // setup pagination array
      this._tableService.paginatedRows = setupPagination(movies, 10);
      this._tableService.numberOfRows = movies.length

      // keep track of paginated rows to disable next button
      this._tableService.numberOfGroupedRows = Object.keys(this._tableService.paginatedRows).length
      this._dataService.setIsDataAvailable(true);
    
      this.resultNumber = this._tableService.numberOfRows

      // set starting state
      this.setPaginationState();
      // sorting is good to go
      console.log(sortByObjectValue(movies, 'cast'));

    });

    this.columns = this._dataService.getColumns();

  }

}
