import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

import { Movie } from '../models/Movie';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl: string = 'http://127.0.0.1:5000/';

  movies: Movie[];
  isDataAvailable:boolean = false;

  constructor(private http: HttpClient) {

   }
  
   // get movies
   getMovies(): Observable<Movie[]> {
     return this.http.get<Movie[]>(this.apiUrl);
   }

   getColumns(): string[]{
     return ["title", "type", "rating"];
   }

   // getting/setter isDataAvailable
   getIsDataAvailable(){
    return this.isDataAvailable;
   }
   setIsDataAvailable(bool: boolean){
    this.isDataAvailable = bool;
   }
}
