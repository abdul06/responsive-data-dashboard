import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { TableDataComponent } from './components/table-data/table-data.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataService } from './services/data.service';
import { TableRowComponent } from './components/table-row/table-row.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardsComponent,
    TableDataComponent,
    DashboardComponent,
    TableRowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
