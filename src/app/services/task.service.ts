import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../Interfaz/tareas';  // Importamos la interfaz

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private baseUrl = 'https://c74f4156107e.ngrok.app/api/gabriel/tareas.php?table=tarea';

  constructor(private http: HttpClient) { }

  // Obtener todas las tareas
  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.baseUrl}`);
  }
  // Obtener tarea por ID
  getItemById(id: number): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.baseUrl}&id=${id}`);
  }  
  // Agregar nueva tarea
  addTarea(tarea: Tarea): Observable<Tarea> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('Datos enviados:', tarea); // Asegúrate de que los datos estén bien formateados
    return this.http.post<Tarea>(`${this.baseUrl}`, tarea, { headers });
  }
  

  // Eliminar tarea por ID
  deleteTarea(id: number): Observable<Tarea> {
    return this.http.delete<Tarea>(`${this.baseUrl}&id=${id}`);
  }
  
  // Edtar tarea por ID
  editTarea(id: number, tarea: Tarea): Observable<Tarea> {  // Añadir el parámetro id y corregir el tipo
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Tarea>(`${this.baseUrl}&id=${id}`, tarea, { headers });
  }
}
