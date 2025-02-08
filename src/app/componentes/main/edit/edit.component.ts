import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';  
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../tareaServicio/tarea.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarea } from '../../../Interfaz/tareas';

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

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Inicializa el formulario con los nombres que la API espera: titulo, hora y descripcion.
    this.form = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.maxLength(10)]],
      hora: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(20)]]
    });

    // Obtener el ID de la tarea desde los parámetros de la ruta
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      // Cargar la tarea existente
      this.taskService.getItemById(id).subscribe({
        next: (data: Tarea) => {
          this.tarea = data;
          // Actualiza el formulario con los datos existentes
          this.form.patchValue({
            titulo: data.titulo,
            hora: data.hora,
            descripcion: data.descripcion
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
      
      // Suponiendo que deseas usar la fecha actual:
      const fechaActual = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
      // Obtén la hora del formulario y agrega ":00" para los segundos
      const horaFormateada = `${fechaActual} ${this.form.value.hora}:00`;
  
      // Construir el objeto tarea con el campo 'hora' actualizado
      const updatedTarea: Tarea = {
        ...this.tarea,         // Conservar los demás campos (usuario_id, etc.)
        titulo: this.form.value.titulo,
        descripcion: this.form.value.descripcion,
        hora: horaFormateada   // Ahora es un timestamp completo
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
      alert('Por favor completa todos los campos correctamente.');
    }
  }
  
  
}
