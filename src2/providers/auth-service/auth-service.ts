import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }

  postData(data, url) {
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
      });
     
    const options = { headers: headers };
    let json = JSON.stringify(data);
    let apiUrl=localStorage.getItem("apiUrl");
    let completeUrl=apiUrl + url ;
    console.log("URL: "+completeUrl);
    console.log("JSON: "+json);
    return this.http.post(completeUrl, json, options);
  }
}
