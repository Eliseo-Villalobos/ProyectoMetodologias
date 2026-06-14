import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Proyecto {
  id: number;
  titulo: string;
  categoria: 'CASAS' | 'EDIFICIOS' | 'RENDERS' | 'PLANOS' | 'REMODELACIONES';
  tag: string;
  subtitulo: string;
  ubicacion: string;
  imagen: string;
  descripcion: string; // ← nuevo campo
}

@Component({
  standalone: true,
  selector: 'app-proyectos',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.css'
})
export class Proyectos implements OnInit {
  filtroActivo: string = 'TODOS';
  proyectosFiltrados: Proyecto[] = [];
  proyectoSeleccionado: Proyecto | null = null; // ← proyecto que se muestra en el modal

  listaProyectos: Proyecto[] = [
    { 
      id: 1, titulo: 'Casa Moderna Las Palmas', categoria: 'CASAS', tag: 'CASA', 
      subtitulo: 'RESIDENCIAL · 2024', ubicacion: 'Col. Las Palmas, Irapuato',
      imagen: 'assets/proyectos/casa1.jpeg',
      descripcion: 'Hermosa casa moderna de dos plantas con acabados de lujo, jardín privado y alberca.'
    },
    { 
      id: 2, titulo: 'Edificio Corporativo Centro', categoria: 'EDIFICIOS', tag: 'EDIFICIO', 
      subtitulo: 'COMERCIAL · 2023', ubicacion: 'Centro, Irapuato',
      imagen: 'assets/proyectos/edificio.png',
      descripcion: 'Edificio de oficinas de 8 niveles con estacionamiento subterráneo y áreas comunes.'
    },
    { 
      id: 3, titulo: 'Villa Silao — Remodelación', categoria: 'REMODELACIONES', tag: 'REMODELACIÓN', 
      subtitulo: 'REMODELACIÓN · 2024', ubicacion: 'Silao, Guanajuato',
      imagen: 'assets/proyectos/remodelacion.png',
      descripcion: 'Remodelación completa de villa residencial incluyendo fachada, interiores y jardín.'
    },
    { 
      id: 4, titulo: 'Render Casa Club Residencial', categoria: 'RENDERS', tag: 'RENDER', 
      subtitulo: 'RENDER 3D · 2024', ubicacion: 'Irapuato, Guanajuato',
      imagen: 'assets/proyectos/render.png',
      descripcion: 'Render arquitectónico 3D de casa club para fraccionamiento residencial privado.'
    },
    { 
      id: 5, titulo: 'Plano Residencia Norte', categoria: 'PLANOS', tag: 'PLANO', 
      subtitulo: 'PLANO · 2023', ubicacion: 'León, Guanajuato',
      imagen: 'assets/proyectos/plano.png',
      descripcion: 'Plano arquitectónico detallado de residencia de 3 recámaras con doble garage.'
    },
    { 
      id: 6, titulo: 'Dúplex Familiar Jardines', categoria: 'CASAS', tag: 'CASA', 
      subtitulo: 'RESIDENCIAL · 2025', ubicacion: 'Col. Jardines, Irapuato',
      imagen: 'assets/proyectos/casa2.png',
      descripcion: 'Dúplex familiar con diseño contemporáneo, 4 recámaras y áreas verdes compartidas.'
    }
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

  // Abre el modal con el proyecto seleccionado
  abrirModal(proyecto: Proyecto) {
    this.proyectoSeleccionado = proyecto;
  }

  // Cierra el modal
  cerrarModal() {
    this.proyectoSeleccionado = null;
  }
} 