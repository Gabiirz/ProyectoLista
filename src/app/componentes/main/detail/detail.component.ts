import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../tareaServicio/tarea.service';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Obtener el ID desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Inicializar el formulario reactivo en modo deshabilitado (solo lectura)
    this.form = this.formBuilder.group({
      titulo: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(10)]],
      hora: [{ value: '', disabled: true }, Validators.required],
      descripcion: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(20)]]
    });

    // Obtener la tarea desde la API y actualizar el formulario
    this.taskService.getItemById(id).subscribe({
      next: (tarea) => {
        console.log('Tarea obtenida:', tarea);
        this.tarea = tarea;
        if (this.tarea) {
          // Obtener la fecha actual en formato YYYY-MM-DD
          const currentDate = new Date().toISOString().split('T')[0];
          // Si la tarea tiene la hora en formato "HH:mm" (por ejemplo, "19:00"), se concatena con la fecha
          const horaConDia = currentDate + ' ' + (this.tarea.hora || '');
          // Actualizar el formulario con los valores de la tarea, usando el campo "hora" con la fecha añadida
          this.form.patchValue({
            titulo: this.tarea.titulo || '',
            hora: this.tarea.hora,
            descripcion: this.tarea.descripcion || ''
          });
        }
      },
      error: (err) => {
        console.error('Error al obtener la tarea:', err);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    });
  }
}





