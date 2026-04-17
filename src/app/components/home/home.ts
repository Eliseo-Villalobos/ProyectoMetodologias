import { Component, inject, AfterViewInit, ElementRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private el = inject(ElementRef);

  private currentIndex = 0;

  ngAfterViewInit() {
    const video = this.el.nativeElement.querySelector('.hero-video') as HTMLVideoElement;
    if (video) {
      video.muted = true;
      video.volume = 0;
    }

    const reveals = this.el.nativeElement.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, { threshold: 0.2 });
    reveals.forEach((el: any) => observer.observe(el));

    // ===== CAROUSEL ===== (va después, con su return propio)
    const carousel = this.el.nativeElement.querySelector('#categories-carousel');
    const btnPrev = this.el.nativeElement.querySelector('#btn-prev');
    const btnNext = this.el.nativeElement.querySelector('#btn-next');
    if (!carousel || !btnPrev || !btnNext) return;

    const slide = (dir: number) => {
      const slides = carousel.querySelectorAll('.cat-slide');
      const visible = window.innerWidth < 600 ? 2 : window.innerWidth < 900 ? 3 : 4;
      const max = slides.length - visible;
      this.currentIndex = Math.max(0, Math.min(this.currentIndex + dir, max));
      const slideW = slides[0].offsetWidth + 16;
      carousel.style.transform = `translateX(-${this.currentIndex * slideW}px)`;
    };

    btnNext.addEventListener('click', () => slide(1));
    btnPrev.addEventListener('click', () => slide(-1));
  }

  estaLogueado() { return this.authService.estaLogueado(); }
  getUsuario() { return this.authService.getUsuario(); }
  irAViajes() { this.router.navigate(['/viajes']); }
}

