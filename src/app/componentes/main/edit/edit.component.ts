import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';  // Importa FormsModule
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],  // Agrega FormsModule aquí
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {  
  tarea: {id: number, addT: string, addThorario: string, addDescripcion: string} = {id: -1, addT: "Sustituir", addThorario: "10:00", addDescripcion: "tareaSustituida"};
  Horario: string[] = ['10:00','13:00','17:00', '19:00', '21:00'];

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {}
  
  public form!: FormGroup;
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tarea = this.taskService.getItemById(id);

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

  editTarea() {
    const id = this.tarea.id;
    this.taskService.editTarea(this.form.value);
    this.router.navigate(['/list']);
  }

  send(): any {
    console.log(this.form.value);
  }

}


