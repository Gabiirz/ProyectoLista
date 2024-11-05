import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  private storageKey = 'tareas';


  constructor() { 

    if (this.isLocalStorageAvailable()){
      const savedTareas = localStorage.getItem(this.storageKey);
      if(savedTareas){
        this.tareas = JSON.parse(savedTareas);
      }
    }
  }

  tareas = [
    {id: 1, addT: 'Limpieza', addThorario:'10 a.m', addDescripcion: 'Arreglar las sábanas y organizar la cama' },
    {id: 2, addT: 'Estudiar', addThorario:'2 p.m', addDescripcion: 'Estudiar matemáticas y física'},
    {id: 3, addT: 'Compra', addThorario:'5 p.m', addDescripcion: 'Comprar pan, leche y frutas'}
    
  ];

  getItemById(id: number): any{
    return this.tareas.find(tareas => tareas.id === id);
  }
  
  getTareas(){
    return this.tareas;

  }

  
  addTarea(addT: string, addThorario: string, addDescripcion: string){
    const newId = this.tareas.length > 0
    ? Math.max(...this.tareas.map(tarea => tarea.id)) + 1
    : 1;

    const tarea = {id: newId,  addT, addThorario, addDescripcion};

    this.tareas.push(tarea);
    this.saveToLocalStorage();
    
  }

  deleteTarea(index: number){
      
    this.tareas.splice(index, 1);
    this.saveToLocalStorage();
  }
  
  // Método para guardar la lista de Digimon en localStorage como un string JSON.
  private saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tareas)); // Convierte el arreglo a JSON y lo guarda
  }

  // Método que verifica si localStorage está disponible en el entorno actual
  private isLocalStorageAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    } catch (e) {
      return false;
    }
  }
}
