import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { ViajeService } from './services/viaje';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private viajeService = inject(ViajeService);

  ngOnInit() {
    // Pre-carga los viajes al iniciar la app
    this.viajeService.getAll().subscribe();
  }
}