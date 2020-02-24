import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { TableComponent } from './components/table/table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataService } from './services/data.service';
import { TableHeadComponent } from './components/table-head/table-head.component';
import { TableBodyComponent } from './components/table-body/table-body.component';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { TablePaginationComponent } from './components/table-pagination/table-pagination.component';
import { TableService } from './services/table.service';
import { TableOptionsComponent } from './components/table-options/table-options.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DashboardsComponent,
    TableComponent,
    DashboardComponent,
    TableHeadComponent,
    TableBodyComponent,
    TableHeaderComponent,
    TablePaginationComponent,
    TableOptionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ClarityModule,
    BrowserAnimationsModule
  ],
  providers: [DataService, TableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
