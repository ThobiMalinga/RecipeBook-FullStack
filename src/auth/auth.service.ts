// // src/app/auth/auth.service.ts
// import { Injectable, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// export interface AuthUser {
//   id: string;
//   email: string;
//   name: string;
//   token: string;
// }

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private http = inject(HttpClient);
//   private storage: Storage = localStorage;
//   private readonly KEY = 'auth_user';

//   get currentUser(): AuthUser | null {
//     const raw = localStorage.getItem(this.KEY) || sessionStorage.getItem(this.KEY);
//     return raw ? JSON.parse(raw) : null;
//   }

//   get isLoggedIn(): boolean {
//     return !!this.currentUser?.token;
//   }

//   async login(email: string, password: string, remember = false): Promise<void> {
//     this.storage = remember ? localStorage : sessionStorage;

//     // Hardcode login
//     await new Promise(r => setTimeout(r, 400));
//     if (email === 'test@gmail.com' && password === 'password'){
//       const user: AuthUser = {
//         id: 'u1',
//         email,
//         name: 'Demo User',
//         token: 'fake-jwt-' + btoa(email),
//       };
//       this.storage.setItem(this.KEY, JSON.stringify(user));
//     } else {
//       throw new Error('Invalid email or password');
//     }
//   }

//   logout(): void {
//     localStorage.removeItem(this.KEY);
//     sessionStorage.removeItem(this.KEY);
//   }
// }

// src/app/auth/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  surname?: string;
  token: string;
}

interface RegisteredUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private storage: Storage = localStorage;

  private readonly KEY = 'auth_user';
  private readonly USERS_KEY = 'registered_users';

  get currentUser(): AuthUser | null {
    const raw = localStorage.getItem(this.KEY) || sessionStorage.getItem(this.KEY);
    return raw ? JSON.parse(raw) : null;
  }

  get isLoggedIn(): boolean {
    return !!this.currentUser?.token;
  }

  async register(
    name: string,
    surname: string,
    email: string,
    password: string
  ): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 400));

    const users = this.getRegisteredUsers();
    const normalizedEmail = email.trim().toLowerCase();

    const userExists = users.some(user => user.email === normalizedEmail);

    if (userExists) {
      throw new Error('An account with this email already exists.');
    }

    const newUser: RegisteredUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      surname: surname.trim(),
      email: normalizedEmail,
      password
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  async login(email: string, password: string, remember = false): Promise<void> {
    this.storage = remember ? localStorage : sessionStorage;

    await new Promise(resolve => setTimeout(resolve, 400));

    const normalizedEmail = email.trim().toLowerCase();
    const users = this.getRegisteredUsers();

    const registeredUser = users.find(
      user => user.email === normalizedEmail && user.password === password
    );

    const isDemoUser = normalizedEmail === 'test@gmail.com' && password === 'password';

    if (!registeredUser && !isDemoUser) {
      throw new Error('Invalid email or password');
    }

    const user: AuthUser = registeredUser
      ? {
          id: registeredUser.id,
          email: registeredUser.email,
          name: registeredUser.name,
          surname: registeredUser.surname,
          token: 'fake-jwt-' + btoa(registeredUser.email)
        }
      : {
          id: 'u1',
          email: normalizedEmail,
          name: 'Demo User',
          token: 'fake-jwt-' + btoa(normalizedEmail)
        };

    this.storage.setItem(this.KEY, JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem(this.KEY);
    sessionStorage.removeItem(this.KEY);
  }

  private getRegisteredUsers(): RegisteredUser[] {
    const raw = localStorage.getItem(this.USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  }
}