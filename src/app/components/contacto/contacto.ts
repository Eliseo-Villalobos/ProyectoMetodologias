import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-contacto',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {
  
  datosContacto = {
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: ''
  };

  enviarFormulario() {
    console.log('Mensaje enviado según diseño:', this.datosContacto);
    alert('Mensaje enviado con éxito.');
    
    // Reseteo limpio
    this.datosContacto = {
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
      servicio: '',
      mensaje: ''
    };
  }
}