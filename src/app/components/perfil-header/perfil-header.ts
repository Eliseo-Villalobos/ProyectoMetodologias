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
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Milo',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Luna',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Max',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Sara',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Leo',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Zoe',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Kai',
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