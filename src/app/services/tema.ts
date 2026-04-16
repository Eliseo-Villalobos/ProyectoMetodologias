import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Tema {
  private isDarkMode = false;

  toggleTheme(){
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-theme', this.isDarkMode);
  }

  getIsDarkMode(){
    return this.isDarkMode;
  }
}
