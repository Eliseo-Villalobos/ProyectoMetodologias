import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Tema {
  isDarkMode = signal(false);//senal para poder mandarla a otros archivos

  toggleTheme(){
    this.isDarkMode.set(!this.isDarkMode());
    document.body.classList.toggle('dark-theme', this.isDarkMode());
  }

}
