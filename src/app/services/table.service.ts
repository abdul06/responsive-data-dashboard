import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  initialRows: any[];
  rows: any[];
  paginatedRows: any[];
  numberOfRows: number = 0;
  numberOfGroupedRows: number = 0;
  paginationSize: number = 0;
  
  constructor() { 

  }

}
