import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  tareas: {addT: string, addThorario: string, addDescripcion: string} []= [];

  constructor(private taskService: TaskService){}

  ngOnInit(): void {
    this.tareas = this.taskService.getTareas();
  }


  deleteTareas(index: number){
    this.taskService.deleteTarea(index);
  }



}
