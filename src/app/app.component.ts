import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListComponent, AddComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestor-tareas';
}
