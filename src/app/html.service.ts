import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})

export class HtmlService {

  private api = environment;

  categories: any;
  themes: any;
  text: any;
  categoryOnService = '';
  themeOnService = '';
  textOnService: any;
  IDtheme: number;
  dataParsedOnService: any;
  socketOnService: any;
  myIDOnService: any;
  isOnline = false;
  isRenderedFinish = false;

  constructor( private http: HttpClient) { }

  getCategory() {
    return this.http.get(this.api.apiUrl + 'api/v1/categories')
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  getTheme(categoryName) {
    return this.http.get(this.api.apiUrl + 'api/v1/themes?category=' + categoryName)
      .subscribe((themes) => {
        this.themes = themes;
      });
  }

  getText(categoryName, themeName) {
    return this.http.get(this.api.apiUrl + 'api/v1/text?category=' + categoryName + '&theme=' + themeName)
      .subscribe((text) => {
        this.text = text;
      });
  }
  postText(servers: object) {
    return this.http.post( this.api.apiUrl + 'api/v1/textObj', JSON.stringify(servers), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })})
      .subscribe(
        (val) => {
          console.log('POST call successful value returned in body', val);
        },
        response => {
          console.log('POST call in error', response);
        },
        () => {
          console.log('The POST observable is now completed.');
        }
      );
  }

  postCategory(servers: object) {
    return this.http.post(this.api.apiUrl + 'api/v1/category', JSON.stringify(servers), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })})
      .subscribe(
        (val) => {
          console.log('POST call successful value returned in category', val);
        },
        response => {
          console.log('POST call in error', response);
        },
        () => {
          console.log('The POST observable is now completed.');
        }
      );
  }

  postTheme(servers: object) {
    return this.http.post(this.api.apiUrl + 'api/v1/theme', JSON.stringify(servers), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })})
      .subscribe(
        (val) => {
          console.log('POST call successful value returned in theme', val);
        },
        response => {
          console.log('POST call in error', response);
        },
        () => {
          console.log('The POST observable is now completed.');
        }
      );
  }

}
// TODO methods for login:
//  - get - /db/user?login="значення"(повертає дані по користувачу)
//  - post - /db/add/user - приймає JSON { "login": "...", ... }
