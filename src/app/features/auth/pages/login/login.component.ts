import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements  OnInit{
  public error = '';
  form!: FormGroup;
  constructor(private fb:FormBuilder, private  auth:AuthService, private router:Router){}
  ngOnInit(): void {
   this.form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  }
  
submit() {
    if (this.form.invalid) return;
    this.error = '';
    this.auth.login(this.form.value as any).subscribe({
      next: () => {
  // ✅ Correct route
      this.router.navigateByUrl('/products');
    },
      error: (e) => this.error = e?.error?.message ?? 'Login failed',
    });
  }




}
