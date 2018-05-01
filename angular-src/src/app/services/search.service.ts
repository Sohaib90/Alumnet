import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  authToken: any;
  query: any;

  constructor(
    private http:Http
  ) { }

  getUsers(query){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/search', query, {headers:headers})
      .map(res => res.json());
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}