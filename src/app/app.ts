import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Contacto } from './components/contacto/contacto';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Contacto],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  mostrarChat = false;

  ngOnInit() {
   
  }

  toggleChat() {
    this.mostrarChat = !this.mostrarChat;
  }
}