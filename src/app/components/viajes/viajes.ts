import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViajeService } from '../../services/viaje';
import { Viaje } from '../../interfaces/models';

@Component({
  selector: 'app-viajes',
  imports: [],
  templateUrl: './viajes.html',
  styleUrl: './viajes.css'
})
export class Viajes implements OnInit {
  private viajeService = inject(ViajeService);
  private router = inject(Router);

  viajes: Viaje[] = [];
  error = '';

  ngOnInit() {
    this.viajeService.getAll().subscribe({
      next: (data) => this.viajes = data,
      error: () => this.error = 'Error al cargar los viajes'
    });
  }

  verDetalle(id: number) {
    this.router.navigate(['/viajes', id]);
  }
}