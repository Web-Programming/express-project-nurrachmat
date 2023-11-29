import { Component } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //template driven
  email = "rachmat.nur91@gmail.com";
  password = "";

  model = {email: "mamata@gmail.com", password:""}

  //Reactive form
  myemail = new FormControl('')
  mypass = new FormControl('')

  //Grouping Form
  formLogin = new FormGroup({
    email: new FormControl(''),
    pass: new FormControl('')
  })
}
