import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Comentarios } from '../pages/comentarios/comentarios';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:3000/api/v1/comUsuario'

  listarComentarios(): Observable<Comentarios[]> {
    return this.http.get<Comentarios[]>(this.apiUrl);
    
  }
  
  
  getComentarioById(ComentarioId: number): Observable<Comentarios[]> {
    return this.http.get<Comentarios[]>(`${this.apiUrl}/${ComentarioId}`);
  }
  
  agregarComentario(ComentarioData: any): Observable<any> {
    const url = `${this.apiUrl}`; // Ajusta la URL según tu estructura de rutas
    return this.http.post(url, ComentarioData);
  }
  getComentarioByID(id:number):Observable<Comentarios>{
    return this.http.get<Comentarios>(`${this.apiUrl}/?id=${id}`)
  }
  
  actualizarComentario(Comentario:any):Observable<Comentarios>{
    return this.http.put<Comentarios>(`${this.apiUrl}/${Comentario.id}`,Comentario)
  }
  eliminarComentario(Comentario:any):Observable<Comentarios>{
    return this.http.delete<Comentarios>(`${this.apiUrl}/${Comentario.id}`)
  }
}
