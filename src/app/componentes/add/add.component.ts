import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  Horario: string[] = ['10:00','13:00','17:00', '19:00', '21:00'];

  constructor(private taskService: TaskService){}

  
  addTarea(addT: string, addThorario: string, addDescripcion: string){
    this.taskService.addTarea({addT, addThorario, addDescripcion});
  }

  

}
