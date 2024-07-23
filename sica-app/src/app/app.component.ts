import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: 'inicio', icon: 'home' },
    { title: 'Registro', url: 'registro', icon: 'person' },
    { title: 'Mapa', url: 'mapa', icon: 'map' },
    { title: 'Login', url: 'login', icon: 'paper-plane' },
    { title: 'FeedBack', url: 'comentarios', icon: 'heart' },
    { title: 'Archived', url: 'cajero', icon: 'archive' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
