import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../Interfaz/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // Asegúrate de que esta URL corresponda a tu API activa
  private baseUrl = 'https://c74f4156107e.ngrok.app/api/gabriel/tareas.php?table=usuario';

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}`);
  }

  insertUsuario(usuario: Usuario): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Se especifica responseType: 'text' y se hace un cast a Observable<string>
    return this.http.post(this.baseUrl, usuario, { headers, responseType: 'text' }) as Observable<string>;
  }

  // Actualizar un usuario existente
  updateUsuario(usuario: Usuario): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.baseUrl}&id=${usuario.id}`, usuario, { headers, responseType: 'text' }) as Observable<string>;
  }

  // Eliminar un usuario
  deleteUsuario(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}&id=${id}`, { responseType: 'text' }) as Observable<string>;
  }
}

