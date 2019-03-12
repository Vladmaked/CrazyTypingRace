import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ServiceService {

  constructor( private http: HttpClient ) { }

  putText( servers: any[]) {
    return this.http.post('https://cars-41d13.firebaseio.com/data.json', servers);
  }
}
