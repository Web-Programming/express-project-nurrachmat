import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from './storage';
import { DataService } from './data.service';
import { User } from './user';
import { Authresponse } from './authresponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage, private dataservice : DataService) { }

  public getToken(): any {
    return this.storage.getItem('APP-token');
  }
  public saveToken(token: string): void {
    this.storage.setItem('APP-token', token);
  }
   //untuk kebutuhan register
  public register(user: User) :Promise<any>{
    return new Promise((resolve, reject) => { 
      this.dataservice
      .register(user)
      .subscribe(
          response => {
            this.saveToken(response.token)
          }
      )
    });
    
      //.then((authResp: Authresponse) => this.saveToken(authResp.token))
  }

  
}
