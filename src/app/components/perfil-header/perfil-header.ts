import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-header',
  imports: [],
  templateUrl: './perfil-header.html',
  styleUrl: './perfil-header.css'
})
export class PerfilHeader {
  private authService = inject(AuthService);
  private router = inject(Router);

  mostrarMenu = signal(false);
  mostrarAvatares = signal(false);

  avatares = [
    'assets/avatares/avatar1.png',
    'assets/avatares/avatar2.png',
    'assets/avatares/avatar3.png',
    'assets/avatares/avatar4.png',
    'assets/avatares/avatar5.png',
    'assets/avatares/avatar6.png',
    'assets/avatares/avatar7.png',
    'assets/avatares/avatar8.png',
    'assets/avatares/avatar9.png',
  ];

  getUsuario() {
    return this.authService.getUsuario();
  }

  estaLogueado() {
    return this.authService.estaLogueado();
  }

  getAvatar(): string {
    return localStorage.getItem('avatar') || this.avatares[0];
  }

  seleccionarAvatar(url: string) {
    localStorage.setItem('avatar', url);
    this.mostrarAvatares.set(false);
    this.mostrarMenu.set(false);
  }

  toggleMenu() {
    this.mostrarMenu.set(!this.mostrarMenu());
    if (!this.mostrarMenu()) this.mostrarAvatares.set(false);
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}