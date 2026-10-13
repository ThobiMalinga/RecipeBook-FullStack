// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-register',
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.scss'
// })
// export class RegisterComponent {
  
// registerForm!: FormGroup;

//   constructor(private fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.registerForm = this.fb.group({
//       name: ['', [Validators.required]],
//       surname: ['', [Validators.required]],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   onSubmit() {
//     if (this.registerForm.valid) {
//       console.log('Form Submitted:', this.registerForm.value);
//       // call your API here
//     } else {
//       this.registerForm.markAllAsTouched();
//     }
//   }
// }


import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  registerForm!: FormGroup;
  loading = false;
  authError: string | null = null;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit(): Promise<void> {
    this.authError = null;

    if (this.registerForm.invalid || this.loading) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    try {
      const { name, surname, email, password } = this.registerForm.value;

      await this.auth.register(name, surname, email, password);

      this.router.navigate(['/recipes']);
    } catch (e: any) {
      this.authError = e?.message || 'Registration failed. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  onClear(): void {
    this.registerForm.reset();
    this.authError = null;
  }
}