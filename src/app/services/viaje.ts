import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Viaje } from '../interfaces/models';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ViajeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/viajes';
  private cache: Viaje[] | null = null;

  getAll(): Observable<Viaje[]> {
    if (this.cache) {
      return of(this.cache);
    }
    return this.http.get<Viaje[]>(this.apiUrl).pipe(
      tap(data => this.cache = data)
    );
  }

  getById(id: number) {
    // Primero busca en cache
    if (this.cache) {
      const viaje = this.cache.find(v => v.id_viaje === id);
      if (viaje) return of(viaje);
    }
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

  limpiarCache() {
    this.cache = null;
  }
}