import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

import { Movie } from '../models/Movie';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  moviesUrl: string = 'http://127.0.0.1:5000/';

  movies: Movie[];

  constructor(private http: HttpClient) {

   }

   getMovies(): Observable<Movie[]> {
     console.log('Fetching Movies from service...');
     return this.http.get<Movie[]>(this.moviesUrl);
   }

   getColumns(): string[]{
     return ["title", "type", "rating"];
   }
}
