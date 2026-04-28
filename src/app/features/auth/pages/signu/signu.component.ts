import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signu',
  templateUrl: './signu.component.html',
  styleUrl: './signu.component.scss',
})
export class SignuComponent implements OnInit {
  isSubmitted = false;
  error = '';

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {}
  ngOnInit(): void {}

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.error = '';
    this.isSubmitted = true;
    // const { name, email, password } = this.form.value;

    // NOTE: your AuthService signature is signup(email, password, name)
    this.auth.signup(this.form.value as any).subscribe({
      next: () => {
        this.isSubmitted = false;
        // Auto-logged in (per hardened service). Navigate to profile.

        // ✅ Correct route
        this.router.navigateByUrl('/auth/profile');
      },
      error: (e) => {
        this.isSubmitted = false;
        // Handles "Email already registered" if you added the uniqueness check
        this.error = e?.error?.message ?? e?.message ?? 'Signup failed';
      },
    });
  }
}
