import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aerolinea } from '../interfaces/models';

@Injectable({ providedIn: 'root' })
export class AerolineaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/aerolineas';

  getAll() {
    return this.http.get<Aerolinea[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<Aerolinea>(`${this.apiUrl}/${id}`);
  }
}