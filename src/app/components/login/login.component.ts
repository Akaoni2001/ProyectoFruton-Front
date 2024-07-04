import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public token: any;
  public identity: any;
  public data_error: any;
  public data_error_vacio: any;

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _router: Router,
  ) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  close_alert() {
    this.data_error = '';
  }

  login() {
    if (this.loginForm.valid) {
      console.log('Form is valid, sending login request...');
      const user = new User(
        '',
        '',
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value,
        '',
      );

      this._userService.login(user).subscribe(
        response => {
          console.log('Login response:', response);
          this.token = response.jwt;
          localStorage.setItem('token', this.token);

          this._userService.login(user).subscribe(
            response => {
              console.log('User identity response:', response);
              localStorage.setItem('identity', JSON.stringify(response.user));
              this._router.navigate(['/dashboard']);
            },
            error => {
              console.error('Error getting user identity:', error);
            }
          );
        },
        error => {
          console.error('Login error:', error);
          this.data_error = error.error.message;
        }
      );
    } else {
      console.log('Form is invalid');
      this.data_error_vacio = 'Por favor, complete todos los campos';
    }
  }
}
