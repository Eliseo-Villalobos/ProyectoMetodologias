import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FechaPipe } from '../../pipes/fecha-pipe';
import { Viaje } from '../../interfaces/models';

@Component({
  standalone: true,
  selector: 'app-viaje-card',
  imports: [FechaPipe],
  templateUrl: './viaje-card.html',
  styleUrl: './viaje-card.css',
})
export class ViajeCard {
  @Input() viaje!: Viaje; //recibe el viaje desde el componente padre
  @Output() seleccionar = new EventEmitter<Viaje>(); //emite el viaje seleccionado al componente padre

  onSelect() {
    this.seleccionar.emit(this.viaje);
  }
}
