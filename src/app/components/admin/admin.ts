import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef); // ← nuevo

  admin: any = null;
  totalProyectos = 0;
  totalVisitas = 0;
  estadisticas: any[] = [];

  ngOnInit() {
    if (!this.authService.estaLogueado()) {
      this.router.navigate(['/login']);
      return;
    }
    this.admin = this.authService.getAdmin();
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {
    this.http.get<any>('http://localhost:3000/api/proyectos/estadisticas')
      .subscribe({
        next: (res) => {
          console.log('Datos recibidos:', res);
          this.estadisticas = res.proyectos;
          this.totalProyectos = res.proyectos.length;
          this.totalVisitas = res.totalVisitas;
          this.cdr.detectChanges(); // ← fuerza actualización de la vista
        },
        error: (err: any) => console.error('Error cargando estadísticas:', err)
      });
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}