import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable, catchError } from 'rxjs';
import { Authresponse } from './authresponse';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //inject class httpclient
  constructor(private http: HttpClient) { }

  //mengatur base url api yg dipakai
  private apiBaseUrl = 'http://localhost:3000';

  //method untuk mengambil data todo
  public getListTodo() {
    const url: string = `${this.apiBaseUrl}/todo`;
    return this.http.get(url);
  }
  
  //method untuk menginsert data todo
  public saveTodo(text: string) {
    const url: string = `${this.apiBaseUrl}/todo/insert`;
    return this.http.post(url, {text: text});
  }
  //method untuk menghapus data todo
  public deleteTodo(id: String) {
    const url: string = `${this.apiBaseUrl}/todo/delete/${id}`;
    return this.http.delete(url);
  }

  public register(user: User): Observable<Authresponse> {
    return this.makeAuthApiCall('register', user);
  }
  public login(user: User): Observable<Authresponse> {
    return this.makeAuthApiCall('login', user);
  }

  public makeAuthApiCall(urlPath: string, user: User): Observable<Authresponse>{
    const url: string = `${this.apiBaseUrl}/users/${urlPath}`;
    return this.http.post<Authresponse>(url, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error);
  }

}
