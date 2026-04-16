import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Viajes } from './components/viajes/viajes';
import { ViajeDetalle } from './components/viaje-detalle/viaje-detalle';
import { MisReservas } from './components/mis-reservas/mis-reservas';
import { NotFound } from './components/not-found/not-found';
import { Contacto } from './components/contacto/contacto';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'viajes', component: Viajes },
    { path: 'viajes/:id', component: ViajeDetalle },
    { path: 'mis-reservas', component: MisReservas },
    {path: 'contacto', component: Contacto},
    { path: '**', component: NotFound }
    
];