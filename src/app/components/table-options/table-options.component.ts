import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-table-options]',
  templateUrl: './table-options.component.html',
  styleUrls: ['./table-options.component.scss']
})
export class TableOptionsComponent implements OnInit {
  @Input() searchTable: (event:any) => {};

  constructor() { }

  ngOnInit() {
  }
}
