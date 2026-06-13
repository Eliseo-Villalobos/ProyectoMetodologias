import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  admin: any = null;

  ngOnInit() {
    // Si no está logueado, redirigir al login
    if (!this.authService.estaLogueado()) {
      this.router.navigate(['/login']);
      return;
    }
    this.admin = this.authService.getAdmin();
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}