import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  form!: ReturnType<FormBuilder['group']>;
  showPass    = false;
  isSubmitting = false;
  error       = '';
  private returnUrl = '/home';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name:     ['', [Validators.required, Validators.minLength(2)]],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {
    // Already logged in → skip login page
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
      return;
    }
    // Capture returnUrl from query params (set by authGuard)
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/home';
  }

  get f() { return this.form.controls; }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.isSubmitting = true;
    this.error = '';
    setTimeout(() => {
      const ok = this.auth.login(
        this.f['email'].value!,
        this.f['password'].value!,
        this.f['name'].value!
      );
      if (ok) {
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.error = 'Invalid credentials. Please try again.';
        this.isSubmitting = false;
      }
    }, 900);
  }
}
