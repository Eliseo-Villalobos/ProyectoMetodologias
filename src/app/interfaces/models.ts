export interface Usuario {
    id_usuario: number;
    nombre: string;
    email: string;
    telefono?: string;
}

export interface Viaje {
    id_viaje: number;
    destino: string;
    pais: string;
    fecha_salida: string;
    fecha_regreso: string;
    precio: number;
    cupo_disponible: number;
    descripcion?: string;
    imagen_url?: string;
}

export interface Reserva {
    id_reserva: number;
    id_usuario: number;
    id_viaje: number;
    fecha_reserva: string;
    cantidad_personas: number;
    estado: 'pendiente' | 'confirmada' | 'cancelada';
    destino?: string;
    pais?: string;
    fecha_salida?: string;
    fecha_regreso?: string;
    precio?: number;
}

export interface LoginResponse {
    mensaje: string;
    token: string;
    usuario: Usuario;
}