import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Properties
  paginatedPage:number = 1;
  constructor(){
  }

  public test() {
    console.log('hello talib');
    this.paginatedPage++;
  }

}
