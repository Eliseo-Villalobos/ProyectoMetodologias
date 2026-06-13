import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  mensaje = '';
  error = '';

  // Cambiamos email/password por usuario/contrasena
  form = this.fb.group({
    usuario: ['', [Validators.required]],
    contrasena: ['', [Validators.required, Validators.minLength(4)]],
  });

  submit() {
    if (this.form.invalid) {
      this.error = 'Por favor completa todos los campos';
      return;
    }

    const { usuario, contrasena } = this.form.value;

    this.authService.login(usuario!, contrasena!).subscribe({
      next: (res) => {
        this.authService.guardarSesion(res);
        this.mensaje = 'Login exitoso, redirigiendo...';
        this.error = '';
        // Redirigir al panel de administrador
        setTimeout(() => this.router.navigate(['/admin']), 1000);
      },
      error: () => {
        this.error = 'Usuario o contraseña incorrectos';
        this.mensaje = '';
      },
    });
  }
}