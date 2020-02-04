import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardsComponent } from './componetns/dashboards/dashboards.component';
import { TableDataComponent } from './componetns/table-data/table-data.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardsComponent,
    TableDataComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
