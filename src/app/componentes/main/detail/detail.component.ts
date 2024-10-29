import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  tarea: any;

  constructor(private route: ActivatedRoute, private taskService: TaskService){}

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id')!; // Obtener el id de la URL
    this.tarea = this.taskService.getItemById(id); // Obtener el elemento
  }
}
