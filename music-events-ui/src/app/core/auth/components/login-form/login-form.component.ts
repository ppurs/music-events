import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', { 
        validators: [Validators.required, Validators.email]
      }],
    password:['', Validators.required]
  });

  isRequestPending: boolean;
  isSuccess: boolean;
  private valSubscription?: Subscription;

  constructor(private auth: AuthService,
              private fb: FormBuilder,
              private router: Router) { 
    this.isRequestPending = false;
    this.isSuccess = true;
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    this.valSubscription = this.loginForm.valueChanges.subscribe(() => this.isSuccess = true);
  }

  ngOnDestroy(): void {
    this.valSubscription?.unsubscribe();
  }

  onSubmit() {
    if ( this.loginForm.invalid ) {
      this.loginForm.markAllAsTouched();
    }
    else {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.isRequestPending = true;
      this.isSuccess = true;

      this.auth.login( <string>email, <string>password ).subscribe({
        next: (res) => {
          this.isRequestPending = false;

          if( res.result ) {
            this.router.navigate([this.auth.INITIAL_PATH])
          }
          else {
            this.isSuccess = false;
            // "Invalid username or password. Try again."
          }
        },
      })
    }
  }
}
