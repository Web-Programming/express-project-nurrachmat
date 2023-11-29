import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo/todo.component';

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

  public saveTodo(text: string) {
    const url: string = `${this.apiBaseUrl}/todo/insert`;
    return this.http.post(url, {text: text});
  }

   public simpanTodo(user: Todo): Promise<any> {
    const url: string = `${this.apiBaseUrl}/todo/insert`;
    return this.http
    .post(url, user)
    .toPromise()
    .then(response => response as any)
    .catch(this.handleError);
  }



  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

}
