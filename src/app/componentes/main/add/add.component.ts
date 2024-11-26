import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  Horario: string[] = ['10:00', '13:00', '17:00', '19:00', '21:00'];

  constructor(private taskService: TaskService, private formBuilder: FormBuilder) { }


  addTarea(addT: string, addThorario: string, addDescripcion: string) {
    this.taskService.addTarea(addT, addThorario, addDescripcion);
  }

  title = 'formulario';

  public form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({

      nombre: ['', 
        [Validators.maxLength(10), 
         Validators.required]],

      horario: ['', Validators.required],

      descripcion: ['', 
        [Validators.minLength(20),
         Validators.required]]

    });


  }
  send(): any {
    console.log(this.form.value);
  }


}

