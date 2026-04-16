import { Component, inject, signal, output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';

//para el tema de nuestra pagina(dark, light)
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Tema } from '../../services/tema';
@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatButtonModule],
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
  //para el tema
  temaService = inject(Tema);
}