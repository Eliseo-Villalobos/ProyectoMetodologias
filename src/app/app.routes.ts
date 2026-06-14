import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { NotFound } from './components/not-found/not-found';
import { Contacto } from './components/contacto/contacto';
import { Proyectos } from './components/proyectos/proyectos'; 
import { Servicios } from './components/servicios/servicios';
import { Nosotros } from './components/nosotros/nosotros';
import { Admin } from './components/admin/admin';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'contacto', component: Contacto },
    { path: 'proyectos', component: Proyectos }, 
    { path: 'servicios', component: Servicios },
    { path: 'nosotros', component: Nosotros },
    {path: 'admin', component: Admin },
    { path: '**', component: NotFound }
];