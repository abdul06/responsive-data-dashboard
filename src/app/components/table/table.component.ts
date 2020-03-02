import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  host: {'class': 'table'}
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
  columns:any;
  rows: any;
  total: number;
  rowsPerPageList: number[] = [10, 25, 50, 100];

  // ----------------------------
  // Methods


  // ----------------------------
  // Init on load of component
  ngOnInit() {

    // get movie api data
    this._dataService.getMovies().subscribe( movies => {

      // set service variables
      this._tableService.rows = movies;
      this._dataService.setIsDataAvailable(true);
      this.rows = movies;
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
