import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { NotFound } from './components/not-found/not-found';
import { Contacto } from './components/contacto/contacto';
import { Admin } from './components/admin/admin';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'contacto', component: Contacto },
  {path: 'admin', component: Admin },
  { path: '**', component: NotFound }
];