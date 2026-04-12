import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViajeService } from '../../services/viaje';
import { Viaje } from '../../interfaces/models';
import { FechaPipe } from '../../pipes/fecha-pipe';

@Component({
  selector: 'app-viajes',
  imports: [FechaPipe],
  templateUrl: './viajes.html',
  styleUrl: './viajes.css'
})
export class Viajes implements OnInit {
  private viajeService = inject(ViajeService);
  private router = inject(Router);

  viajes: Viaje[] = [];
  error = '';
  cargando = true;

  ngOnInit() {
    this.viajeService.getAll().subscribe({
      next: (data) => {
        this.viajes = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar los viajes';
        this.cargando = false;
      }
    });
  }

  verDetalle(viaje: Viaje) {
    this.router.navigate(['/viajes', viaje.id_viaje], {
      queryParams: {
        destino: viaje.destino,
        pais: viaje.pais,
        precio: viaje.precio
      }
    });
  }
}