import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Properties
  name:string = 'Talib';
  constructor(){
      this.changeName('Kawthar');
  }

  // Methods
  changeName(name:string):void {
    this.name = name;
  }
}
