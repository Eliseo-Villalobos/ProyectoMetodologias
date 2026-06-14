import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface Servicio {
  titulo: string;
  descripcion: string;
  icono: string;
}

interface Valor {
  titulo: string;
  descripcion: string;
  icono: string;
}

@Component({
  standalone: true,
  selector: 'app-servicios',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css'
})
export class Servicios {
  // Las 6 tarjetas extraídas directamente de tu image_0a20b8.png
  listaServicios: Servicio[] = [
    { 
      titulo: 'Diseño arquitectónico', 
      descripcion: 'Proyectos personalizados que combinan criterios estéticos y funcionales, adaptados a tus necesidades, terreno y presupuesto. Incluye anteproyecto, proyecto ejecutivo y memoria descriptiva.', 
      icono: 'villa' 
    },
    { 
      titulo: 'Construcción', 
      descripcion: 'Edificación de casas, edificios y estructuras comerciales. Trabajamos con materiales de calidad y equipos especializados, cumpliendo plazos y normativas de construcción vigentes.', 
      icono: 'corporate_fare' 
    },
    { 
      titulo: 'Remodelación', 
      descripcion: 'Transformamos espacios existentes mejorando funcionalidad, estética y valor de tu propiedad. Desde renovaciones parciales hasta reestructuraciones completas de interiores y exteriores.', 
      icono: 'foundation' 
    },
    { 
      titulo: 'Elaboración de renders', 
      descripcion: 'Visualización fotorrealista 3D de tu proyecto antes de iniciar la construcción. Permite anticipar el resultado final, tomar mejores decisiones de diseño y presentar la propuesta a clientes o inversionistas.', 
      icono: 'layers' 
    },
    { 
      titulo: 'Planos arquitectónicos', 
      descripcion: 'Elaboración de planos técnicos completos: plantas arquitectónicas, cortes, alzados, detalles constructivos y planos de instalaciones conforme a la normatividad municipal vigente.', 
      icono: 'architecture' 
    },
    { 
      titulo: 'Gestión de permisos', 
      descripcion: 'Tramitación completa de licencias y permisos de construcción ante autoridades municipales y estatales. Nos encargamos del proceso burocrático para que tú te concentres en tu proyecto.', 
      icono: 'description' 
    }
  ];

  // Las 3 columnas de la franja inferior oscura
  listaValores: Valor[] = [
    {
      titulo: 'Experiencia comprobada',
      descripcion: 'Más de 12 años y 150 proyectos nos respaldan. Referencias disponibles de clientes satisfechos en Guanajuato.',
      icono: 'workspace_premium'
    },
    {
      titulo: 'Servicio integral',
      descripcion: 'Desde el diseño hasta los permisos y la entrega final. Un solo equipo para todo el proceso constructivo.',
      icono: 'all_inclusive'
    },
    {
      titulo: 'Cumplimiento de plazos',
      descripcion: 'Trabajamos con cronogramas definidos y transparencia en el avance de obra para tu tranquilidad.',
      icono: 'calendar_today'
    }
  ];
}