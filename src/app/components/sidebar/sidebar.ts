import { Component, inject, signal, output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private authService = inject(AuthService);
  private router = inject(Router);

  visible = signal(true);
  visibleChange = output<boolean>();

  toggle() {
    this.visible.set(!this.visible());
    this.visibleChange.emit(this.visible());
  }

  estaLogueado() {
    return this.authService.estaLogueado();
  }

  getUsuario() {
    return this.authService.getUsuario();
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}