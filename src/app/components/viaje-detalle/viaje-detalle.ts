import { Component, inject, OnInit, AfterViewInit, NgZone, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { ViajeService } from '../../services/viaje';
import { ReservaService } from '../../services/reserva';
import { AerolineaService } from '../../services/aerolinea';
import { AuthService } from '../../services/auth';
import { Viaje, Aerolinea } from '../../interfaces/models';
import { FechaPipe } from '../../pipes/fecha-pipe';
import * as L from 'leaflet';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const iconDefault = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  standalone: true,
  selector: 'app-viaje-detalle',
  imports: [
    FormsModule,
    FechaPipe,
    DecimalPipe,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './viaje-detalle.html',
  styleUrl: './viaje-detalle.css',
})
export class ViajeDetalle implements OnInit, AfterViewInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private viajeService = inject(ViajeService);
  private reservaService = inject(ReservaService);
  private aerolineaService = inject(AerolineaService);
  private authService = inject(AuthService);
  private ngZone = inject(NgZone);

  viaje = signal<Viaje | null>(null);
  aerolineas = signal<Aerolinea[]>([]);
  cantidadPersonas = signal(1);
  aerolineaSeleccionada = signal<number | null>(null);
  mensaje = signal('');
  error = signal('');
  distancia = signal('');
  ubicacionUsuario = signal<{ lat: number; lng: number } | null>(null);

  destinoParam = '';
  paisParam = '';
  precioParam = 0;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.destinoParam = params['destino'] || '';
      this.paisParam = params['pais'] || '';
      this.precioParam = params['precio'] || 0;
    });

    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.viajeService.getById(id).subscribe({
        next: (data) => {
          this.viaje.set(data);
          setTimeout(() => this.iniciarMapa(), 500);
        },
        error: () => this.error.set('Viaje no encontrado'),
      });
    });

    this.aerolineaService.getAll().subscribe({
      next: (data) => this.aerolineas.set(data),
      error: () => console.error('Error al cargar aerolíneas'),
    });

    this.obtenerUbicacion();
  }

  ngAfterViewInit() {}

  obtenerUbicacion() {
    if (!navigator.geolocation) {
      this.distancia.set('Geolocation no disponible');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.ngZone.run(() => {
          const ubicacion = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          this.ubicacionUsuario.set(ubicacion);
          const v = this.viaje();
          if (v?.latitud && v?.longitud) {
            this.distancia.set(
              this.calcularDistancia(ubicacion.lat, ubicacion.lng, v.latitud, v.longitud),
            );
          }
        });
      },
      () => this.distancia.set('No se pudo obtener ubicación'),
    );
  }

  calcularDistancia(lat1: number, lng1: number, lat2: number, lng2: number): string {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return `${(R * c).toFixed(0)} km`;
  }

  iniciarMapa() {
    const v = this.viaje();
    if (!v?.latitud || !v?.longitud) return;

    const mapa = L.map('mapa').setView([v.latitud, v.longitud], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(mapa);

    L.marker([v.latitud, v.longitud])
      .addTo(mapa)
      .bindPopup(`📍 ${v.destino}, ${v.pais}`)
      .openPopup();

    const ubicacion = this.ubicacionUsuario();
    if (ubicacion) {
      L.marker([ubicacion.lat, ubicacion.lng]).addTo(mapa).bindPopup('📍 Tu ubicación');
    }
  }

  reservar() {
    if (!this.authService.estaLogueado()) {
      this.router.navigate(['/login']);
      return;
    }
    if (!this.aerolineaSeleccionada()) {
      this.error.set('Selecciona una aerolínea');
      return;
     }
    const usuario = this.authService.getUsuario();
    this.reservaService
      .create(usuario!.id_usuario, this.viaje()!.id_viaje, this.cantidadPersonas())
      .subscribe({
        next: () => {
          this.mensaje.set('¡Reserva realizada con éxito!');
          this.error.set('');
        },
        error: () => {
          this.error.set('Error al realizar la reserva');
          this.mensaje.set('');
        },
      });
  }

  regresar() {
    this.router.navigate(['/viajes']);
  }
}