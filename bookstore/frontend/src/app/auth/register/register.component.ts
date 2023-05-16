import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
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
      this.authService
        .register({ ...this.registerForm.value, role: 'USER' })
        .subscribe(
          (q: any) => {
            console.log(q);
            localStorage.setItem('type', q?.role);
            this.router.navigateByUrl('/books');
          },
          (err) => {
            if (err.status === 400) {
              this.registerForm.get('email')?.setErrors({ hasInvalid: true });
            }
          }
        );
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
