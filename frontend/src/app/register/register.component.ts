import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public formError: string = '';
  public credentials = {
    name: '',
    email: '',
    password: ''
  };
  
  constructor(private router: Router, private authenticationService: AuthenticationService
  ) { }

  public onRegisterSubmit(): void {
      this.formError = '';
      if (
        !this.credentials.name ||
        !this.credentials.email ||
        !this.credentials.password
      ) {
        this.formError = 'All fields are required, please try again';
      } else {
        this.doRegister();
      }
  }
    private doRegister(): void {
      
      this.authenticationService.register(this.credentials)
        .then(() => this.router.navigateByUrl('/todo'))
        .catch((message) => this.formError = message);
    }

}
