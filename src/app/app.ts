import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { ViajeService } from './services/viaje';
import { Contacto } from './components/contacto/contacto';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Sidebar, Contacto],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  private viajeService = inject(ViajeService);

  ngOnInit() {
    // Pre-carga los viajes al iniciar la app
    this.viajeService.getAll().subscribe();
  }
  mostrarChat = false;

  toggleChat() {
    this.mostrarChat = !this.mostrarChat;
  }
}
