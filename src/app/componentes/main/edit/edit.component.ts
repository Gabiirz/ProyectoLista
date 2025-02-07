import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';  
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],  
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {  
  tarea: any;  // La tarea se asignará con los datos de la API
  Horario: string[] = ['10:00','13:00','17:00', '19:00', '21:00'];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  public form!: FormGroup;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Obtener la tarea por su ID
    this.taskService.getItemById(id).subscribe({
      next: (tarea) => {
        this.tarea = tarea; // Asigna los datos de la tarea obtenida
        this.initializeForm(tarea); // Inicializa el formulario con los datos
      },
      error: (err) => {
        console.error('Error al obtener la tarea:', err); // Maneja el error si ocurre
      }
    });

    // Inicializa el formulario
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.maxLength(10), Validators.required]],
      horario: ['', Validators.required],
      descripcion: ['', [Validators.minLength(20), Validators.required]]
    });
  }

  // Inicializa el formulario con los datos de la tarea
  initializeForm(tarea: any) {
    this.form.patchValue({
      nombre: tarea.addT,
      horario: tarea.addThorario,
      descripcion: tarea.addDescripcion
    });
  }

  // Método para editar la tarea
  editTarea() {
    const id = this.tarea.id;
    this.taskService.editTarea(id, this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/list']); // Redirige a la lista de tareas
      },
      error: (err) => {
        console.error('Error al editar tarea:', err); // Manejo de errores
      }
    });
  }

  send(): any {
    console.log(this.form.value); // Imprime el valor del formulario
  }
}



