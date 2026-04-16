import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-contacto',
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrls: ['./contacto.css'],
})
export class Contacto {
  @Output() cerrar = new EventEmitter<void>();

  private http = inject(HttpClient);
  nombre = '';
  correo = '';
  mensaje = '';

  enviar(formulario: any) {
    this.http.post('http://localhost:3000/contacto', formulario.value).subscribe({
      next: (res) => {
        console.log('Enviado al backend', res);
        formulario.reset();
        alert('Mensaje enviado correctamente');
      },
      error: (err) => {
        console.error('Error', err);
      },
    });
  }
}