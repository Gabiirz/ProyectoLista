import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'https://c74f4156107e.ngrok.app/api/nombre_usuario/nombre_api.php?table=tareas';

  constructor(private http: HttpClient) { }

  // Get all tasks
  getTareas(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // Get task by ID
  getItemById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}&id=${id}`);
  }

  // Add new task
  addTarea(tarea:any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}`, tarea, { headers });
  }

  // Delete task by ID
  deleteTarea(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}&id=${id}`);
  }

  // Edit task by ID
  editTarea(tarea:any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.baseUrl}&id=${id}`, tarea, { headers });
  }
}
