import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  mensaje = '';
  error = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  submit() {
    if (this.form.invalid) {
      this.error = 'Por favor completa todos los campos correctamente';
      return;
    }

    const { email, password } = this.form.value;

    this.authService.login(email!, password!).subscribe({
      next: (res) => {
        this.authService.guardarSesion(res);
        this.mensaje = 'Login exitoso, redirigiendo...';
        this.error = '';
        setTimeout(() => this.router.navigate(['/home']), 1000);
      },
      error: () => {
        this.error = 'Credenciales incorrectas';
        this.mensaje = '';
      }
    });
  }
}