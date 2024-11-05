import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  tareas: {id: number, addT: string, addThorario: string, addDescripcion: string} []= [];
  tareaEditada: { id?: number, addT?: string, addThorario?: string, addDescripcion?: string } = {};  editingIndex: number | null = null;
  dialog: any;

  constructor(private taskService: TaskService, private router: Router){}

  ngOnInit(): void {
    this.tareas = this.taskService.getTareas();
  }


  deleteTareas(index: number){
    this.taskService.deleteTarea(index);
  }

  viewTarea(id: number){
    this.router.navigate(['/tarea', id]);
  }



}
