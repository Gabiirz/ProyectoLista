import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../tareaServicio/tarea.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  tareas: any[] = []; // Lista de tareas
  loading: boolean = true; // Estado de carga
  error: string | null = null; // Mensaje de error

  constructor(private taskService: TaskService, private router: Router) {}


  
  ngOnInit(): void {
    // Llamada al servicio para obtener todas las tareas
    this.taskService.getTareas().subscribe({
      next: (data) => {
        console.log(data);
        this.tareas = data; // Asigna las tareas a la propiedad tareas
        this.loading = false; // Cambiar el estado de carga
      },
      error: (err) => {
        this.error = 'Error al obtener tareas. Intenta nuevamente.'; // Manejo de error
        console.error('Error al obtener tareas:', err);
        this.loading = false; // Cambiar el estado de carga
      }
    });
  }

  deleteTarea(id: number): void {
    this.taskService.deleteTarea(id).subscribe({
      next: (tareaEliminada) => {
        // Si en tu modelo la propiedad identificadora es 'idtarea'
        this.tareas = this.tareas.filter(t => t.idtarea !== id);
      },
      error: (err) => {
        console.error('Error al eliminar tarea:', err);
      }
    });
  }

  viewTarea(id: number): void {
    console.log(id); // Verifica el valor de `id`
    if (id) {
      this.router.navigate(['/tarea', id]); // Solo navega si el id es válido
    } else {
      console.error('ID de tarea es indefinido');
    }
  }

  editarTarea(id: number): void {
    // Navega a la edición de la tarea
    this.router.navigate(['/edit', id]);
  }
}


