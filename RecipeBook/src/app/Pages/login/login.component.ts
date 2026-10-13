// src/app/auth/login.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  private router = inject(Router);
  private auth = inject(AuthService);

  model = {
    email: '',
    password: '',
    rememberMe: false,
  };

  showPassword = false;
  loading = false;
  authError: string | null = null;

  async onLogin(f: NgForm) {
    if (f.invalid || this.loading) return;

    this.loading = true;
    this.authError = null;

    try {
      await this.auth.login(this.model.email, this.model.password, this.model.rememberMe);
     
      this.router.navigate(['/recipes']);
    } catch (e: any) {
      this.authError = e?.message || 'Login failed. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  onClear(f: NgForm) {
    f.resetForm({
      email: '',
      password: '',
      rememberMe: false,
    });
    this.authError = null;
    this.showPassword = false;
  }

  onForgotPassword(event: Event) {
    event.preventDefault();
   
    console.log('Forgot password clicked');
  }

  onGoToRegister(event: Event) {
    event.preventDefault();

    console.log('Go to register clicked');
  }
}
