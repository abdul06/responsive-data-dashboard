import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { mockData } from '../../../utils/mock';
import { Dashboard } from '../../models/Dashboards';
import { sortByObjectValue } from '../../../utils/utils';
import { getDataPoints } from '../../../utils/utilsjs';
import { Chart } from 'chart.js';
//@ts-nocheck
@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {
  sortedData: any[];
  dashboards:Dashboard[];
  chart1: Chart;
  chartData: any[];
  getDataPoints = getDataPoints;
  constructor( public _dataService: DataService) { }


  
  cleanDataForChart() {

  }


  ngOnInit() {
    // get movie api data
    this._dataService.getMovies().subscribe( movies => {

        
        this.chartData = this.getDataPoints(movies, 'date_added', 'type');
        
        this.sortedData = sortByObjectValue(this.chartData, 'label', 'ascending');
        let chartLabels = this.sortedData.map( item => item.label);
        let moviesData = this.sortedData.map( item => item.Movie);
        let tvData = this.sortedData.map( item => { return item['TV Show'] ? item['TV Show'] : 0 });
        this.chartInit(chartLabels, moviesData, tvData);
      },
      error => {
        // very bad... :-( need to setup a cached version if no api... this is just a quick fix if api is down

        this.chartData = this.getDataPoints(mockData, 'date_added', 'type');
        this.sortedData = sortByObjectValue(this.chartData, 'date_added', 'ascending');
        let chartLabels = this.sortedData.map( item => item.label);
        let moviesData = this.sortedData.map( item => item.Movie);
        let tvData = this.sortedData.map( item => { return item['TV Show'] ? item['TV Show'] : 0 });
        this.chartInit(chartLabels, moviesData, tvData);

      }
    );
  }


  chartInit( chartLabel, dataSetOne, dataSetTwo){
    this.chart1 = new Chart('canvas', {
      type: 'line',
      data: {
        labels: chartLabel,
        datasets: [
          {
            label: 'Movies',
            data: dataSetOne,
            borderColor:'#2ECC40'
          },
          {
            label: 'TV Shows',
            data: dataSetTwo,
            borderColor: '#FF0000'
          }
        ]
      },
      options: {
        title: {
          display: false,
          text: 'Color test'
        },
        legend: {
          position: 'left',
          display: true,
          labels: {
            fontSize: 12
          }
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    });
  }

};
