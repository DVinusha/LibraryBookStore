import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get registerFormControl() {
    return this.registerForm.controls;
  }

  save() {
    if (this.registerForm.valid) {
      this.authService.login(this.registerForm.value).subscribe(
        (q: any) => {
          localStorage.setItem('type', q?.role);
          this.router.navigateByUrl('/books');
        },
        (err) => {
          console.log(err);
          if (err.status === 400) {
            this.registerForm.get('password')?.setErrors({ hasInvalid: true });
          }
        }
      );
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
