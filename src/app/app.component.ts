import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { HeaderComponent } from './componentes/header/header.component';
import { MainComponent } from './componentes/main/main.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestor-tareas';
}
