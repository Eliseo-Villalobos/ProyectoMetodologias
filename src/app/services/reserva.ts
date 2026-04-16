import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reserva } from '../interfaces/models';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/reservas';

  getMisReservas(id_usuario: number) {
    return this.http.get<Reserva[]>(`${this.apiUrl}/usuario/${id_usuario}`);
  }

  create(id_usuario: number, id_viaje: number, cantidad_personas: number) {
    return this.http.post(this.apiUrl, { id_usuario, id_viaje, cantidad_personas });
  }

  updateEstado(id_reserva: number, estado: string) {
    return this.http.put(`${this.apiUrl}/${id_reserva}`, { estado });
  }

  delete(id_reserva: number) {
    return this.http.delete(`${this.apiUrl}/${id_reserva}`);
  }
}