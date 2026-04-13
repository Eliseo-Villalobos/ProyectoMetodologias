import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private authService = inject(AuthService);
  private router = inject(Router);

  estaLogueado() {
    return this.authService.estaLogueado();
  }

  getUsuario() {
    return this.authService.getUsuario();
  }

  irAViajes() {
    this.router.navigate(['/viajes']);
  }
}
