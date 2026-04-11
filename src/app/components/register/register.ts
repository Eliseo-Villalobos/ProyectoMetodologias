import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  mensaje = '';
  error = '';

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]]
  });

  submit() {
    if (this.form.invalid) {
      this.error = 'Por favor completa todos los campos correctamente';
      return;
    }

    const { nombre, email, password, telefono } = this.form.value;

    this.authService.register(nombre!, email!, password!, telefono!).subscribe({
      next: () => {
        this.mensaje = 'Usuario registrado con éxito, redirigiendo...';
        this.error = '';
        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      error: () => {
        this.error = 'El email ya está registrado';
        this.mensaje = '';
      }
    });
  }
}