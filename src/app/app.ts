import { Component, inject, OnInit, signal, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { ViajeService } from './services/viaje';
import { Contacto } from './components/contacto/contacto';
import { PerfilHeader } from './components/perfil-header/perfil-header';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, Sidebar, Contacto, PerfilHeader],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit, AfterViewInit {
  private viajeService = inject(ViajeService);

  sidebarVisible = signal(true);
  mostrarChat = false;

  ngOnInit() {
    this.viajeService.getAll().subscribe();
  }

  ngAfterViewInit() {
    const texto = document.getElementById('pingu-texto');
    if (!texto) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        texto.classList.add('visible');
      } else {
        texto.classList.remove('visible');
      }
    }, { threshold: 0.5 });

    observer.observe(texto);
  }

  onSidebarChange(visible: boolean) {
    this.sidebarVisible.set(visible);
  }

  toggleChat() {
    this.mostrarChat = !this.mostrarChat;
  }
}