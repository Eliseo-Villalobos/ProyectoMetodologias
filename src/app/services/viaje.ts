import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Viaje } from '../interfaces/models';

@Injectable({ providedIn: 'root' })
export class ViajeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/viajes';

  getAll() {
    return this.http.get<Viaje[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<Viaje>(`${this.apiUrl}/${id}`);
  }

  create(viaje: Partial<Viaje>) {
    return this.http.post(this.apiUrl, viaje);
  }

  update(id: number, viaje: Partial<Viaje>) {
    return this.http.put(`${this.apiUrl}/${id}`, viaje);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}