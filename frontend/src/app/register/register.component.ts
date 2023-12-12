import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  constructor(private router: Router, private authenticationService: AuthenticationService){}

  public credentials = {
    name: "",
    email: "",
    password: ""
  }

  public formError: string = ''

  public onRegisterSubmit(): void{
    this.formError = '';
    if(!this.credentials.name || !this.credentials.email || !this.credentials.password){
      this.formError = 'All fields are required, please try again';
    }else{
      this.doRegister();
    }
  }

  public doRegister(): void {
      this.authenticationService.register(this.credentials)
        .then(() => {
          this.router.navigateByUrl('/todo');
        })
        .catch((error) => {
          if(error.error?.code == 11000){
            this.formError = "Email already registered";
          }else{
            this.formError = error?.message;
          }
        })
  }
}
