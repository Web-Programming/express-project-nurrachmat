import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private router: Router, private authenticationService: AuthenticationService){}
  public isLoggedIn() : boolean {
    return this.authenticationService.isLoggedIn();
  }

  public doLogout(): void {
    this.authenticationService.logout();
  }

  public getUsername(): string {
    const user : User | null = this.authenticationService.getCurrentUser();
    return user ? user.name : 'Guest';
  }
}
