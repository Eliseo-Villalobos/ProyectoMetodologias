import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { ViajeService } from './services/viaje';
import { Contacto } from './components/contacto/contacto';
import { PerfilHeader } from './components/perfil-header/perfil-header';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Sidebar, Contacto,PerfilHeader],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  private viajeService = inject(ViajeService);

  sidebarVisible = signal(true);
  mostrarChat = false;

  ngOnInit() {
    this.viajeService.getAll().subscribe();
  }

  onSidebarChange(visible: boolean) {
    this.sidebarVisible.set(visible);
  }

  toggleChat() {
    this.mostrarChat = !this.mostrarChat;
  }
}