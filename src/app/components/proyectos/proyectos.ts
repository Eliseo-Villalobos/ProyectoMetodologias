import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface Proyecto {
  id: number;
  titulo: string;
  categoria: 'CASAS' | 'EDIFICIOS' | 'RENDERS' | 'PLANOS' | 'REMODELACIONES';
  tag: string;
  subtitulo: string;
  ubicacion: string;
}

@Component({
  standalone: true,
  selector: 'app-proyectos',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.css'
})
export class Proyectos implements OnInit {
  filtroActivo: string = 'TODOS';
  proyectosFiltrados: Proyecto[] = [];

  // Los proyectos idénticos a los de tus capturas
  listaProyectos: Proyecto[] = [
    { id: 1, titulo: 'Casa Moderna Las Palmas', categoria: 'CASAS', tag: 'CASA', subtitulo: 'RESIDENCIAL · 2024', ubicacion: 'Col. Las Palmas, Irapuato' },
    { id: 2, titulo: 'Edificio Corporativo Centro', categoria: 'EDIFICIOS', tag: 'EDIFICIO', subtitulo: 'COMERCIAL · 2023', ubicacion: 'Centro, Irapuato' },
    { id: 3, titulo: 'Villa Silao — Remodelación', categoria: 'REMODELACIONES', tag: 'REMODELACIÓN', subtitulo: 'REMODELACIÓN · 2024', ubicacion: 'Silao, Guanajuato' },
    { id: 4, titulo: 'Render Casa Club Residencial', categoria: 'RENDERS', tag: 'RENDER', subtitulo: 'RENDER 3D · 2024', ubicacion: 'Irapuato, Guanajuato' },
    { id: 5, titulo: 'Plano Residencia Norte', categoria: 'PLANOS', tag: 'PLANO', subtitulo: 'PLANO · 2023', ubicacion: 'León, Guanajuato' },
    { id: 6, titulo: 'Dúplex Familiar Jardines', categoria: 'CASAS', tag: 'CASA', subtitulo: 'RESIDENCIAL · 2025', ubicacion: 'Col. Jardines, Irapuato' }
  ];

  ngOnInit() {
    this.proyectosFiltrados = this.listaProyectos;
  }

  filtrar(categoria: string) {
    this.filtroActivo = categoria;
    if (categoria === 'TODOS') {
      this.proyectosFiltrados = this.listaProyectos;
    } else {
      this.proyectosFiltrados = this.listaProyectos.filter(p => p.categoria === categoria);
    }
  }
}