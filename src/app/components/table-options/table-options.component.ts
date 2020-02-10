import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-table-options]',
  templateUrl: './table-options.component.html',
  styleUrls: ['./table-options.component.scss']
})
export class TableOptionsComponent implements OnInit {
  // Passed In Props
  @Input() searchTable: (event:any) => {};
  @Input() updateResults: (event:any) => {};
  @Input() rowsPerPageList: number[];
  // Properties
  hideResultNotFinished: boolean = false;

  constructor() { }

  ngOnInit() {
  }
}
