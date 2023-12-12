import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable, catchError } from 'rxjs';
import { Authresponse } from './authresponse';
import { BROWSER_STORAGE } from './storage';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //inject class httpclient
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
    ) { }

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
    const httpOption = {
      headers: new HttpHeaders({'Authorization': `Bearer ${this.storage.getItem('app-token')}`})
    }
    return this.http.post(url, {text: text}, httpOption);
  }
  //method untuk menghapus data todo
  public deleteTodo(id: String) {
    const url: string = `${this.apiBaseUrl}/todo/delete/${id}`;
    const httpOption = {
      headers: new HttpHeaders({'Authorization': `Bearer ${this.storage.getItem('app-token')}`})
    }
    return this.http.delete(url, httpOption);
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
