import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface LoginResponse {
  mensaje: string;
  token: string;
  admin: {
    id_admin: number;
    usuario: string;
    rol: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/auth';

  // Login del administrador
  login(usuario: string, contrasena: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { usuario, contrasena });
  }

  // Guardar sesión en localStorage
  guardarSesion(data: LoginResponse) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('admin', JSON.stringify(data.admin));
  }

  // Cerrar sesión
  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  }

  // Obtener admin guardado
  getAdmin() {
    const a = localStorage.getItem('admin');
    return a ? JSON.parse(a) : null;
  }

  // Verificar si está logueado
  estaLogueado(): boolean {
    return !!localStorage.getItem('token');
  }

  // Verificar si es admin
  esAdmin(): boolean {
    const admin = this.getAdmin();
    return admin?.rol === 'admin';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  // Compatibilidad con componentes anteriores
  getUsuario() {
    return this.getAdmin();
  }

  register(nombre: string, email: string, password: string, telefono: string) {
    return this.http.post(`${this.apiUrl}/register`, { nombre, email, password, telefono });
  }
}