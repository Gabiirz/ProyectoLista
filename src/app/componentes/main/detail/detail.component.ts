import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../tareaServicio/tarea.service';
import { UsuarioService } from '../../../usuarioServicio/usuario.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

// Interfaz de Usuario (ya existente)
export interface Usuario {
  idusuario: number; // Opcional, se genera automáticamente
  id: number;
  nombre: string;
  contrasena: string;
  rol: string;
}

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public form!: FormGroup;
  tarea: any = {}; // Objeto para almacenar la tarea obtenida
  usuarios: Usuario[] = []; // Lista de usuarios para buscar el nombre real

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Inicializar el formulario en modo solo lectura
    this.form = this.formBuilder.group({
      titulo: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(10)]],
      hora: [{ value: '', disabled: true }, Validators.required],
      descripcion: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(20)]],
      encargado: [{ value: '', disabled: true }]  // Campo para mostrar el nombre del encargado
    });

    // Utilizar forkJoin para esperar ambas llamadas (usuarios y tarea)
    forkJoin({
      usuarios: this.usuarioService.getUsuarios(),
      tarea: this.taskService.getItemById(id)
    }).subscribe({
      next: ({ usuarios, tarea }) => {
        this.usuarios = usuarios;
        this.tarea = tarea;
        // Buscar el nombre del usuario a partir del id contenido en la tarea
        const encargadoNombre = this.getUserName(this.tarea.usuario_id);
        // Actualizar el formulario con los datos de la tarea
        this.form.patchValue({
          titulo: this.tarea.titulo || '',
          hora: this.tarea.hora || '',
          descripcion: this.tarea.descripcion || '',
          encargado: encargadoNombre
        });
      },
      error: (err) => {
        console.error('Error al obtener usuarios o tarea:', err);
      }
    });
  }

  // Busca el usuario en la lista por su id y retorna su nombre; de no hallarlo, retorna "Sin asignar"
  getUserName(usuarioId: number): string {
    const user = this.usuarios.find(u => u.idusuario === usuarioId);
    return user ? user.nombre : 'Sin asignar';
  }

  // Método para regresar a la página anterior
  goBack(): void {
    window.history.back();
  }
}






