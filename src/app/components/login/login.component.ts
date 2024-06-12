import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userForm: FormGroup;

  constructor(private fb:FormBuilder){
    this.userForm=this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
