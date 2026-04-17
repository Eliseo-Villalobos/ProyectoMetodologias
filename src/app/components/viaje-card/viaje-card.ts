import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FechaPipe } from '../../pipes/fecha-pipe';
import { Viaje } from '../../interfaces/models';

@Component({
  standalone: true,
  selector: 'app-viaje-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FechaPipe,
  ],
  templateUrl: './viaje-card.html',
  styleUrl: './viaje-card.css',
})
export class ViajeCard {
  @Input() viaje!: Viaje;
  @Output() seleccionar = new EventEmitter<Viaje>();

  onSelect() {
    this.seleccionar.emit(this.viaje);
  }
}