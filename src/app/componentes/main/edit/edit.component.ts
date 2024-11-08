import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Agrega FormsModule aquí
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {  
  tarea: {id: number, addT: string, addThorario: string, addDescripcion: string} = {id: -1, addT: "Sustituir", addThorario: "10:00", addDescripcion: "tareaSustituida"};
  Horario: string[] = ['10:00','13:00','17:00', '19:00', '21:00'];

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tarea = this.taskService.getItemById(id);
  }

  editTarea(addT: string, addThorario: string, addDescripcion: string) {
    const id = this.tarea.id;
    this.taskService.editTarea(id, addT, addThorario, addDescripcion);
    this.router.navigate(['/list']);
  }
}


