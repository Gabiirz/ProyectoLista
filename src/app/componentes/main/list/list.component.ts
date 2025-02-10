import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../tareaServicio/tarea.service';
import { UsuarioService } from '../../../usuarioServicio/usuario.service';
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
  usuarios: any[] = []; // Lista de usuarios
  loading: boolean = true; // Estado de carga
  error: string | null = null; // Mensaje de error

  constructor(
    private taskService: TaskService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Cargar las tareas
    this.taskService.getTareas().subscribe({
      next: (data) => {
        console.log('Tareas:', data);
        this.tareas = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al obtener tareas. Intenta nuevamente.';
        console.error('Error al obtener tareas:', err);
        this.loading = false;
      }
    });

    // Cargar los usuarios
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        console.log('Usuarios:', data);
        this.usuarios = data;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      }
    });
  }

  /**
   * Retorna el nombre del usuario a partir de su identificador.
   * Se busca utilizando tanto 'id' como 'idusuario' para cubrir ambas posibilidades.
   */
  getUserName(usuario_id: number): string {
    const user = this.usuarios.find(
      (u) => u.id === usuario_id || u.idusuario === usuario_id
    );
    return user ? user.nombre : 'Desconocido';
  }

  deleteTarea(id: number): void {
    this.taskService.deleteTarea(id).subscribe({
      next: (tareaEliminada) => {
        // Asumiendo que la propiedad identificadora es 'idtarea'
        this.tareas = this.tareas.filter(t => t.idtarea !== id);
      },
      error: (err) => {
        console.error('Error al eliminar tarea:', err);
      }
    });
  }

  viewTarea(id: number): void {
    console.log('Ver tarea con ID:', id);
    if (id) {
      this.router.navigate(['/tarea', id]);
    } else {
      console.error('ID de tarea es indefinido');
    }
  }

  editarTarea(id: number): void {
    this.router.navigate(['/edit', id]);
  }
}



