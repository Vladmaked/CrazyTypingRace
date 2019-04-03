import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment.prod';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable()
export class ServiceService {

  private api = environment;

  constructor( private http: HttpClient ) { }

  putText( servers: object) {
    return this.http.post( this.api.apiUrl + '/db/add/text', JSON.stringify(servers), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })})
      .subscribe(
        (val) => {
          console.log('POST call successful value returned in body', val);
        },
        response => {
          const reader = new FileReader();
          reader.onloadend = (e) => {
            const readerResult = reader.result;
            console.log('Render res:  ' + readerResult); // ця штука не спрацьовує
          };
          console.log('POST call in error', response);
        },
        () => {
          console.log('The POST observable is now completed.');
        }
      );
  }

}
