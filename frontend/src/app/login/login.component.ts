import { Component } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private authenticationService: AuthenticationService){}
  
  public credentials = {
    name: "",
    email: "",
    password: ""
  }

  public formError: string = ''

  public onLoginSubmit(): void{
    this.formError = '';
    if(!this.credentials.email || !this.credentials.password){
      this.formError = 'All fields are required, please try again';
    }else{
      this.doLogin();
    }
  }

  public doLogin(): void {
      this.authenticationService.login(this.credentials)
        .then(() => {
          this.router.navigateByUrl('/todo');
        })
        .catch((error) => {
            this.formError = error?.error?.message;
        })
  }
}
