import { Component } from '@angular/core';
import { HeaderComponent } from './componentes/header/header.component';
import { MainComponent } from './componentes/main/main.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AddComponent } from './componentes/main/add/add.component';
import { ListComponent } from './componentes/main/list/list.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, HeaderComponent, MainComponent, AddComponent, ListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestor-tareas';
}
