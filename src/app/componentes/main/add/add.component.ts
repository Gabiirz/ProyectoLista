import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../tareaServicio/tarea.service';
import { UsuarioService } from '../../../usuarioServicio/usuario.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Tarea } from '../../../Interfaz/tareas';
import { Usuario } from '../../../Interfaz/usuario';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  // Lista de horarios disponibles
  Horario: string[] = ['10:00', '13:00', '17:00', '19:00', '21:00'];

  // Formulario reactivo
  public form!: FormGroup;

  // Array para almacenar la lista de usuarios
  usuarios: Usuario[] = [];

  constructor(
    private taskService: TaskService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicialización del formulario con validaciones
    this.form = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.maxLength(10)]],
      hora: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
      usuario_id: ['', Validators.required]  // Valor inicial vacío
    });

    // Cargar los usuarios para el select
    this.usuarioService.getUsuarios().subscribe({
      next: (data: Usuario[]) => {
        this.usuarios = data;
        console.log('Usuarios cargados:', this.usuarios);
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      }
    });
  }

  addTarea(): void {
    if (this.form.invalid) {
      console.log('Formulario inválido');
      alert('Por favor completa todos los campos correctamente.');
      return;
    }

    // Obtener la fecha actual en formato "YYYY-MM-DD"
    const fecha = new Date().toISOString().split('T')[0];
    // Combinar la fecha con el horario seleccionado para formar "YYYY-MM-DD HH:MM:SS"
    const horaFormateada = `${fecha} ${this.form.value.hora}:00`;

    // Verificar y convertir el valor del select a número
    console.log('Valor de usuario_id antes de convertir:', this.form.value.usuario_id, typeof this.form.value.usuario_id);
    const usuarioId = Number(this.form.value.usuario_id);

    // Construir el objeto tarea de forma explícita
    const tarea: Tarea = {
      titulo: this.form.value.titulo,
      descripcion: this.form.value.descripcion,
      hora: horaFormateada,
      usuario_id: usuarioId,
      tipotarea_id: 1, // Valor por defecto; ajusta según tu lógica
      comentario_id: 1, // Valor por defecto; ajusta según tu lógica
      etiqueta_id: 1 // Valor por defecto; ajusta según tu lógica
      ,
      idtarea: 0
    };

    console.log('Objeto tarea a enviar:', tarea);

    // Enviar la tarea al backend
    this.taskService.addTarea(tarea).subscribe({
      next: (data) => {
        console.log('Tarea agregada:', data);
        this.router.navigate(['/list']);
      },
      error: (err) => {
        console.error('Error al agregar tarea:', err);
        alert('Hubo un error al agregar la tarea.');
      }
    });
  }
}







