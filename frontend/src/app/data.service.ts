import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo/todo.component';
import { User } from './user';
import { Authresponse } from './authresponse';
import { Observable, map, throwError,catchError } from 'rxjs';

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


  public login(user: User): Observable<Authresponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Observable<Authresponse> {
    return this.makeAuthApiCall('register', user);
  }

  //memanggil api di back end
  private makeAuthApiCall(urlPath: string, user: User): Observable<Authresponse> {
    const url: string = `${this.apiBaseUrl}/users/${urlPath}`;
    return this.http.post<Authresponse>(url, user);
      /* .pipe(
        catchError(this.handleError)
      ); */
    /* return this.http.post<Authresponse>(url, user).pipe(
      map(response => response)
    ); */
  }


  private handleError(error: any){
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
