import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';  
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../tareaServicio/tarea.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarea } from '../../../Interfaz/tareas';
import { UsuarioService } from '../../../usuarioServicio/usuario.service';
import { Usuario } from '../../../Interfaz/usuario';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],  
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {  
  form!: FormGroup;
  tarea!: Tarea;
  Horario: string[] = ['10:00', '13:00', '17:00', '19:00', '21:00'];
  usuarios: Usuario[] = []; // Lista de usuarios para llenar el select
  descriptionLength: number = 0; // Contador de caracteres en la descripción

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Inicializa el formulario con el campo para usuario
    this.form = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.maxLength(10)]],
      hora: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
      usuario_id: ['', Validators.required]  // Campo para el usuario asignado
    });
  
    // Actualiza el contador de la descripción en tiempo real
    this.form.get('descripcion')?.valueChanges.subscribe(value => {
      this.descriptionLength = value ? value.length : 0;
    });

    // Cargar la lista de usuarios
    this.usuarioService.getUsuarios().subscribe({
      next: (data: Usuario[]) => {
        this.usuarios = data;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      }
    });

    // Obtener el ID desde la ruta y cargar la tarea correspondiente
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.taskService.getItemById(id).subscribe({
        next: (data: Tarea) => {
          console.log('Valor original de hora:', data.hora);
          this.tarea = data;
          let horaSolo = data.hora;
          // Si data.hora contiene un espacio, extrae la parte de la hora (ej. "17:00")
          if (data.hora && data.hora.includes(' ')) {
            const partes = data.hora.split(' ');
            if (partes.length > 1) {
              horaSolo = partes[1].substring(0, 5);
            }
          }
          console.log('Hora extraída:', horaSolo);
          this.form.patchValue({
            titulo: data.titulo,
            hora: horaSolo,
            descripcion: data.descripcion,
            usuario_id: data.usuario_id // Se asume que la tarea tiene la propiedad "usuario_id"
          });
        },
        error: (err) => {
          console.error('Error al cargar la tarea:', err);
        }
      });
    }
  }
  
  // Método para enviar el formulario y editar la tarea
  editTarea(): void {
    if (this.form.valid && this.tarea) {
      const id = this.tarea.idtarea;
      
      // Usar la fecha actual para construir el timestamp completo
      const fechaActual = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
      // Obtener la hora del formulario y agregar ":00" para los segundos
      const horaFormateada = `${fechaActual} ${this.form.value.hora}:00`;
  
      // Construir el objeto tarea actualizado, incluyendo el usuario asignado
      const updatedTarea: Tarea = {
        ...this.tarea,  // Conservar los demás campos
        titulo: this.form.value.titulo,
        descripcion: this.form.value.descripcion,
        hora: horaFormateada,
        usuario_id: this.form.value.usuario_id
      };
  
      this.taskService.editTarea(id, updatedTarea).subscribe({
        next: (response: Tarea) => {
          console.log('Respuesta cruda:', response);
          this.router.navigate(['/list']);
        },
        error: (err) => {
          console.error('Error al editar tarea:', err);
          alert('Hubo un error al editar la tarea.');
        }
      });
    } else {
      console.log('Formulario inválido o tarea no cargada');
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
  
  // Método para regresar a la lista
  goBack(): void {
    this.router.navigate(['/list']);
  }
}

