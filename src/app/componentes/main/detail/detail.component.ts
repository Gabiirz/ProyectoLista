import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../services/task.service';
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
  tarea: any = {}; // Inicializamos tarea como un objeto vacío

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Obtener el ID desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Inicializar el formulario reactivo
    this.form = this.formBuilder.group({
      titulo: [{ value: '', disabled: true }, [Validators.maxLength(10), Validators.required]],
      hora: [{ value: '', disabled: true }, Validators.required],
      descripcion: [{ value: '', disabled: true }, [Validators.minLength(20), Validators.required]]
    });

    // Obtener la tarea desde la BD y actualizar el formulario
    this.taskService.getItemById(id).subscribe({
      next: (tarea) => {
        console.log(tarea)
        this.tarea = tarea;

        if (this.tarea) {
          // Usar `patchValue` para llenar el formulario con los valores de la tarea
          this.form.patchValue({
            titulo: this.tarea.titulo || '',
            hora: this.tarea.hora || '',
            descripcion: this.tarea.descripcion || ''
          });
        }
      },
      error: (err) => {
        console.error('Error al obtener la tarea:', err);
        // Aquí puedes agregar un mensaje de error si es necesario
      }
    });
  }
}




