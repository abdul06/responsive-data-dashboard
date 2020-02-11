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
  chart2: Chart;
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
        this.chartInit(chartLabels, moviesData, tvData,);

      }
    );
  }


  chartInit( chartLabel, dataSetOne, dataSetTwo){
    // quick and dirty Put in utili later
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    //Movies
    let combineDataSetOne = dataSetOne.reduce(reducer);
    //Shows
    let combineDataSetTwo = dataSetTwo.reduce(reducer);
    // quick and dirty Put in utili later
    
    
    this.chart1 = new Chart('canvas', {
      type: 'line',
      data: {
        labels: chartLabel,
        datasets: [
          {
            label: 'Movies',
            data: dataSetOne,
            borderColor:'#f0533f'
          },
          {
            label: 'TV Shows',
            data: dataSetTwo,
            borderColor: '#0076be'
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'TV Shows and Movies added from 2008 - 2020',
          fontSize: 20
        },
        legend: {
          position: 'bottom',
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


    this.chart2 = new Chart('canvas2', {
      type: 'doughnut',
      data: {
        labels: ['Movies', 'TV Shows'],
        
        datasets: [
          {
            data: [combineDataSetOne, combineDataSetTwo],
            backgroundColor: ['#f0533f', '#0076be'],
          },
        ]
      },
      options: {
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Ratio of Movies to TV Shows',
          fontSize: 20
        },
        legend: {
          position: 'bottom',
          display: true,
          labels: {
            fontSize: 12
          }
        }
      }
    });

  }

};
