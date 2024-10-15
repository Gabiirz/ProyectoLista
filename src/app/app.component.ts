import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListComponent } from './componentes/list/list.component';
import { AddComponent } from './componentes/add/add.component';
import { HeaderComponent } from './componentes/header/header.component';
import { MainComponent } from "./main/main.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListComponent, AddComponent, RouterLink, HeaderComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestor-tareas';
}
