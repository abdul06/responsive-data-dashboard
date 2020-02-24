import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { TableService } from '../../services/table.service';
import { ClrDatagridStateInterface } from '@clr/angular';
import { setupPagination, sortByObjectValue } from '../../../utils/utils';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor(public _dataService: DataService, public _tableService: TableService) { 
    this.isLoading = true;
  }
  // Passed In (Input) properties

  // ----------------------------
  // Properties
  isApiConnected: boolean;
  isLoading: boolean;
  paginatedPage:number = 1;
  paginatedRows: {
    rows: any[],
    start: string,
    end: string
  };
  columns:any;
  rows: any;
  total: number;
  loading: boolean = true;
  resultNumber: number = 0;
  startRange: number = this.paginatedPage;
  endRange: number = 10;
  isSorted: boolean = false;
  currentSortKey: string = null;
  sortType: string = null;
  rowsPerPageList: number[] = [10, 25, 50, 100];

  // ----------------------------
  // Methods
  /**
   * set pagniation state, used with next(), previous(), and inital setup
   */
  private setPaginationState():void {

    if(this._tableService.paginatedRows === null){
      this.paginatedRows = { rows: [], start: '0', end: '0'};
      this.startRange = parseInt(this.paginatedRows.start);
      this.endRange = parseInt(this.paginatedRows.end);
      return;
    }
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
    // need to reset if using table and search rows
    if(this._tableService.numberOfRows > 0 && this.paginatedPage < this._tableService.numberOfGroupedRows){
      this.paginatedPage++;

      // update 
      this.setPaginationState();
    }
  } 


//   refresh(state: ClrDatagridStateInterface) {
//     this.loading = true;
//     // We convert the filters from an array to a map,
//     // because that's what our backend-calling service is expecting
//     let filters:{[prop:string]: any[]} = {};
//     if (state.filters) {
//         for (let filter of state.filters) {
//             let {property, value} = <{property: string, value: string}>filter;
//             filters[property] = [value];
//         }
//     }

//     // this.rows
//     // .filter(filters)
//     // .sort(<{by: string, reverse: boolean}>state.sort)
//     // .fetch(state.page.from, state.page.size)
//     // .then((result: FetchResult) => {
//     //     this.users = result.users;
//     //     this.total = result.length;
//     //     this.loading = false;
//     // });
// }


  // ----------------------------
  // Init on load of component
  ngOnInit() {

    // get movie api data
    this._dataService.getMovies().subscribe( movies => {

      // set service variables
      this._tableService.rows = movies;
      // setup pagination array
      this._tableService.paginatedRows = setupPagination(movies, 10);
      this._tableService.numberOfRows = movies.length
      // keep track of paginated rows to disable next button
      this._tableService.numberOfGroupedRows = Object.keys(this._tableService.paginatedRows).length
      this._dataService.setIsDataAvailable(true);
      this.rows = movies;
      this.total= movies.length;
      this.setPaginationState();
      this.isApiConnected = true;
      this.isLoading = false;

      

    },

    error => {
        console.log(error)
        this.isApiConnected = false;
        this.isLoading = false;
    });

    // get columns for data setup in data.service.ts [key:string, key:string, key:string]
    this.columns = this._dataService.getColumns();

  }

}
