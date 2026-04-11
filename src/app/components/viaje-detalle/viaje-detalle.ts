import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ViajeService } from '../../services/viaje';
import { ReservaService } from '../../services/reserva';
import { AuthService } from '../../services/auth';
import { Viaje } from '../../interfaces/models';

@Component({
  selector: 'app-viaje-detalle',
  imports: [FormsModule],
  templateUrl: './viaje-detalle.html',
  styleUrl: './viaje-detalle.css'
})
export class ViajeDetalle implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private viajeService = inject(ViajeService);
  private reservaService = inject(ReservaService);
  private authService = inject(AuthService);

  viaje: Viaje | null = null;
  cantidadPersonas = 1;
  mensaje = '';
  error = '';

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.viajeService.getById(id).subscribe({
      next: (data) => this.viaje = data,
      error: () => this.error = 'Viaje no encontrado'
    });
  }

  reservar() {
    if (!this.authService.estaLogueado()) {
      this.router.navigate(['/login']);
      return;
    }

    const usuario = this.authService.getUsuario();
    this.reservaService.create(usuario!.id_usuario, this.viaje!.id_viaje, this.cantidadPersonas).subscribe({
      next: () => {
        this.mensaje = 'Reserva realizada con éxito';
        this.error = '';
      },
      error: () => {
        this.error = 'Error al realizar la reserva';
        this.mensaje = '';
      }
    });
  }

  regresar() {
    this.router.navigate(['/viajes']);
  }
}