import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from '../Interfaz/comentario';  // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  // URL base de la API para comentarios. Ajusta esta URL según tu entorno.
  private baseUrl = 'https://c74f4156107e.ngrok.app/api/gabriel/tareas.php?table=comentario';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los comentarios (sin filtro).  
   * Si necesitas filtrar, se puede usar getComentariosByTask.
   */
  getComentarios(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.baseUrl);
  }

  /**
   * Obtiene los comentarios filtrados por el id de la tarea (idtarea).
   * Se asume que la API acepta un parámetro GET "idtarea".
   */
  getComentariosByTask(idtarea: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.baseUrl}&idtarea=${idtarea}`);
  }

  /**
   * Inserta un nuevo comentario.
   * Se envía el objeto comentario en formato JSON.
   */
  insertComentario(comentario: Comentario): Observable<Comentario> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Comentario>(this.baseUrl, comentario, { headers });
  }

  /**
   * Actualiza un comentario existente.
   * Se espera que el objeto comentario tenga la propiedad "id" (que corresponde a idcomentario en la BD).
   * La API espera el id como parámetro GET.
   */
  updateComentario(comentario: Comentario): Observable<Comentario> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Comentario>(`${this.baseUrl}&id=${comentario.id}`, comentario, { headers });
  }

  /**
   * Elimina un comentario por su id.
   * La API espera el id como parámetro GET.
   */
  deleteComentario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}&id=${id}`);
  }
}



