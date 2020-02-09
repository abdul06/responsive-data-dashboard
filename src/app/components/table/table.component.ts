import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { TableService } from '../../services/table.service';
import { setupPagination, sortByObjectValue } from '../../../utils/utils';

@Component({
  selector: '[app-table]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  host: {'class': 'movie-table'}
})
export class TableComponent implements OnInit {
  constructor(public _dataService: DataService, public _tableService: TableService) { }
  // Passed In (Input) properties

  // ----------------------------
  // Properties
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
  isSorted: boolean = false;
  currentSortKey: string = null;
  sortType: string = null;

  // ----------------------------
  // Methods
  /**
   * set pagniation state, used with next(), previous(), and inital setup
   */
  private setPaginationState():void {
      const pageItem = this._tableService.paginatedRows[`${this.paginatedPage}`];
      // repeated mutiple time setup as function
      this.paginatedRows = pageItem.groupedRows;
      this.startRange = pageItem.start;
      this.endRange = pageItem.end;
  }

  /**
   * Needed to scope to table component with passing to table-header component via @Input so used es6 synthax
   * function expression 
   * setup _tableService.paginatedRows and ran setPaginationState to re-build table dataset 
   * 
   * @param {string} key - sort key from table header
   * 
   * Future state: change to event emmitter in future. 
   * Will keep function scoped to component properly and will not have to setup es6 scoping
   */

  searchTable = (event:any) => {
    console.log('testing keyup event.target.value', event.target.value);
  }

  /**
   * Needed to scope to table component with passing to table-header component via @Input so used es6 synthax
   * function expression 
   * setup _tableService.paginatedRows and ran setPaginationState to re-build table dataset 
   * 
   * @param {string} key - sort key from table header
   * 
   * Future state: change to event emmitter in future. 
   * Will keep function scoped to component properly and will not have to setup es6 scoping
   */

  sortRows = (key:string) => {
    
    // if key is not set than sort by key and ascending
    // if key is set than sort by key and sorted by ascending than switch sort to desending
    // for everything reset sort to ascending and passed in key
    if(this.currentSortKey === null) {
      this.currentSortKey = key
      this.sortType = 'ascending';
    }else if (this.currentSortKey ===  key && this.sortType === 'ascending'){
      this.sortType = 'desending';
    }else{
      this.currentSortKey = key
      this.sortType = 'ascending';
    }
    
    const movies = this._tableService.rows;
    const sorted = sortByObjectValue(movies, key, this.sortType);
    this._tableService.paginatedRows = setupPagination(sorted, 10);
    // setup pagination state after content is sorted
    this.setPaginationState();

  }

  /**
   * goes to previous pagination items in table
   */
  public previous():void {
    if(this.paginatedPage > 1){
      this.paginatedPage--;

      // update 
      this.setPaginationState();
    }
  }
  /**
   * goes to next pagination items in table
   */
  public next():void {
    if(this._tableService.numberOfRows > 0 && this.paginatedPage < this._tableService.numberOfGroupedRows){
      this.paginatedPage++;

      // update 
      this.setPaginationState();
    }
  } 

  // ----------------------------
  // Init on load of component
  ngOnInit() {
    // get movie api data
    this._dataService.getMovies().subscribe( movies => {

      // set service variables
      this._tableService.rows = movies
      console.log('movies on init ',movies);
      // setup pagination array
      this._tableService.paginatedRows = setupPagination(movies, 10);
      this._tableService.numberOfRows = movies.length
      console.log()
      // keep track of paginated rows to disable next button
      this._tableService.numberOfGroupedRows = Object.keys(this._tableService.paginatedRows).length
      this._dataService.setIsDataAvailable(true);
    
      this.resultNumber = this._tableService.numberOfRows

      // set starting state
      this.setPaginationState();
    });

    // get columns for data setup in data.service.ts [key:string, key:string, key:string]
    this.columns = this._dataService.getColumns();

  }

}
