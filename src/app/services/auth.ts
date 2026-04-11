import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse, Usuario } from '../interfaces/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/auth';

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password });
  }

  register(nombre: string, email: string, password: string, telefono: string) {
    return this.http.post(`${this.apiUrl}/register`, { nombre, email, password, telefono });
  }

  guardarSesion(data: LoginResponse) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data.usuario));
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  getUsuario(): Usuario | null {
    const u = localStorage.getItem('usuario');
    return u ? JSON.parse(u) : null;
  }

  estaLogueado(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}