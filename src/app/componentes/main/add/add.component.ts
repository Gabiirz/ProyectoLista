import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../tareaServicio/tarea.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Tarea } from '../../../Interfaz/tareas';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  Horario: string[] = ['10:00', '13:00', '17:00', '19:00', '21:00'];

  public form!: FormGroup;

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicialización del formulario reactivo con validaciones
    this.form = this.formBuilder.group({
      titulo: [
        '', 
        [
          Validators.maxLength(10),  // Máximo 10 caracteres
          Validators.required
        ]
      ],
      hora: ['', Validators.required],
      descripcion: [
        '', 
        [
          Validators.minLength(20),  // Mínimo 20 caracteres
          Validators.required
        ]
      ]
    });
  }

  // Función para enviar los datos del formulario y agregar la tarea
  addTarea(): void {
    if (this.form.valid) {
      // Suponiendo que tienes la fecha actual o una fecha seleccionada
      const fecha = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
      const horaFormateada = `${fecha} ${this.form.value.hora}:00`; // "YYYY-MM-DD 13:00:00"
      
      const tarea: Tarea = {
        ...this.form.value,
        hora: horaFormateada, // Reemplaza el valor '13:00' por el timestamp completo
        usuario_id: 1,
        comentario_id: 1,
        tipotarea_id: 1,
        etiqueta_id: 1
      };
  
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
    } else {
      console.log('Formulario inválido');
      alert('Por favor completa todos los campos correctamente.');
    }
  }
  


  // Para ver los valores del formulario en consola (puedes quitar esta parte si no la necesitas)
  send(): void {
    console.log(this.form.value);
  }
}



