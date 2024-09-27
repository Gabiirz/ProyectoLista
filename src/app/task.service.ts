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
    {addT: 'Hacer la cama', addThorario:'10 a.m'},
    {addT: 'Realizar los deberes', addThorario:'2 p.m'},
    {addT: 'Ir a por la compra', addThorario:'5 p.m'}
    
  ];
  
  getTareas(){
    return this.tareas;

  }
  
  addTarea(tarea : {addT: string, addThorario: string}){
    this.tareas.push(tarea);
    this.saveToLocalStorage();
    
  }

  deleteTarea(index: number){
      
    this.tareas.splice(index, 1);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tareas)); // Convierte el arreglo a JSON y lo guarda
  }

  private isLocalStorageAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    } catch (e) {
      return false;
    }
  }
}
