import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from '../../services/reserva';
import { AuthService } from '../../services/auth';
import { Reserva } from '../../interfaces/models';

@Component({
  selector: 'app-mis-reservas',
  imports: [],
  templateUrl: './mis-reservas.html',
  styleUrl: './mis-reservas.css'
})
export class MisReservas implements OnInit {
  private reservaService = inject(ReservaService);
  private authService = inject(AuthService);
  private router = inject(Router);

  reservas: Reserva[] = [];
  mensaje = '';
  error = '';

  ngOnInit() {
    if (!this.authService.estaLogueado()) {
      this.router.navigate(['/login']);
      return;
    }

    const usuario = this.authService.getUsuario();
    this.reservaService.getMisReservas(usuario!.id_usuario).subscribe({
      next: (data) => this.reservas = data,
      error: () => this.error = 'Error al cargar las reservas'
    });
  }

  cancelar(id_reserva: number) {
    this.reservaService.updateEstado(id_reserva, 'cancelada').subscribe({
      next: () => {
        this.mensaje = 'Reserva cancelada';
        const usuario = this.authService.getUsuario();
        this.reservaService.getMisReservas(usuario!.id_usuario).subscribe({
          next: (data) => this.reservas = data
        });
      },
      error: () => this.error = 'Error al cancelar la reserva'
    });
  }
}