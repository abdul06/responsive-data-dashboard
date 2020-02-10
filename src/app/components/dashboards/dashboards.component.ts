import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { mockData } from '../../../utils/mock';
import { Dashboard } from '../../models/Dashboards';
import { sortByObjectValue } from '../../../utils/utils';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {
  sortedItems: any[];
  dashboards:Dashboard[];
  myChart: any[];
  constructor( public _dataService: DataService) { }

  ngOnInit() {
    // get movie api data
    this._dataService.getMovies().subscribe( movies => {
      console.log(movies);

        this.sortedItems = sortByObjectValue(movies, 'release_year', 'ascending');

        this.myChart = new Chart('canvas', {
          // The type of chart we want to create
          type: 'line',

          // The data for our dataset
          data: {
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [{
                  label: 'My First dataset',
                  backgroundColor: 'rgb(255, 99, 132)',
                  borderColor: 'rgb(255, 99, 132)',
                  data: [0, 10, 5, 2, 20, 30, 45]
              }]
          },

          // Configuration options go here
          options: {}
        });

        console.log(this.myChart);

      },
      error => {
        // very bad... :-( need to setup a cached version if no api... this is just a quick fix if api is down
        this.sortedItems = sortByObjectValue(mockData, 'release_year', 'ascending');

        this.myChart = new Chart('canvas', {
          type: 'bar',
          data: {
              labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets: [{
                  label: '# of Votes',
                  data: [12, 19, 3, 5, 2, 3],
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      });

        console.log(this.myChart);

      }
    );
  }
}
