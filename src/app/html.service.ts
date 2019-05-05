import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})

export class ServiceService {

  private api = environment;

  categories: any;
  themes: any;

  constructor( private http: HttpClient ) { }

  getCategory() {
    return this.http.get(this.api.apiUrl + 'api/v1/categories')
      .subscribe((categories) => {
        this.categories = categories;
        console.log('getCategory() this.categories: ', this.categories);
        console.log('getCategory() this.categories[0].category: ', this.categories[0].category);
      });
  }

  getTheme(categoryName) {
    this.http.get(this.api.apiUrl + 'api/v1/themes?category=' + categoryName)
      .subscribe((themes) => {
        this.themes = themes;
        console.log('getTheme(categoryName) this.themes[0].theme: ', this.themes[0].theme);
        console.log('getTheme(categoryName) this.categories[0].category: ', this.categories[0].category);
      });
  }

  postText(servers: object) {
    return this.http.post( this.api.apiUrl + 'api/v1/text', JSON.stringify(servers), {
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

  // getRandomText(category: string, theme: string) {
  //   return this.http.get(this.api.apiUrl + '/db/text/?category=' + category + '&theme=' + theme).toPromise();
  // }

}
// TODO methods for login:
//  - get - /db/user?login="значення"(повертає дані по користувачу)
//  - post - /db/add/user - приймає JSON { "login": "...", ... }
