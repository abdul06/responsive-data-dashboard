import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

import { Movie } from '../models/Movie';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl: string = 'https://bamboo-lane-267201.appspot.com/';

  movies: Movie[];
  isDataAvailable:boolean = false;

  constructor(private http: HttpClient) {

   }
  
   // get movies data
   getMovies(): Observable<Movie[]> {
     return this.http.get<Movie[]>(this.apiUrl);
   }
   // setup columns from movie
   getColumns(): string[]{
     return ["title", "type", "director", "cast", "country", "date_added", "release_year", "rating", "duration", "listed_in", "description" ];
   }

   // getter isDataAvailable
   getIsDataAvailable(){
    return this.isDataAvailable;
   }
   // setter isDataAvailable
   setIsDataAvailable(bool: boolean){
    this.isDataAvailable = bool;
   }
}
