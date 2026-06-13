import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router'; 
@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterLink, RouterLinkActive], 
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private router = inject(Router);

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  irAContacto() {
    this.router.navigate(['/contacto']);
  }
}