import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from './storage';
import { DataService } from './data.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage, private dataService : DataService ) { }

  //untuk mengambil token
  public getToken(): any {
    return this.storage.getItem("app-token");
  }

  //untuk menyimpan token
  public saveToken(token: string): void {
    this.storage.setItem("app-token", token);
  }

  //untuk kebutuhan register
  public register(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dataService.register(user)
        .subscribe({
          next: (response) => {
            resolve(this.saveToken(response.token))
          },
          error: (e) => {
            reject(e);
          },
          complete: () => {
            console.log("register completed");
          }
        })
    })
  }
}
