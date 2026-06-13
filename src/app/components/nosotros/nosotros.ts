import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface Valor {
  titulo: string;
  descripcion: string;
  icono: string; 
}

@Component({
  standalone: true,
  selector: 'app-nosotros',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css'
})
export class Nosotros {
  // Los 4 valores exactos de image_09c22d.png usando figuras geométricas de Material Icons
  valores: Valor[] = [
    {
      titulo: 'Calidad',
      descripcion: 'Materiales y procesos que garantizan durabilidad y acabados impecables.',
      icono: 'diamond'
    },
    {
      titulo: 'Compromiso',
      descripcion: 'Cumplimos plazos y presupuestos acordados con responsabilidad total.',
      icono: 'radio_button_checked'
    },
    {
      titulo: 'Confianza',
      descripcion: 'Transparencia en cada etapa y comunicación abierta con el cliente.',
      icono: 'radio_button_checked'
    },
    {
      titulo: 'Innovación',
      descripcion: 'Adoptamos nuevas tecnologías como renders 3D y gestión digital de proyectos.',
      icono: 'sparkles'
    }
  ];
}