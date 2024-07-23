import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private apiUrl = 'http://localhost:3000'; // Reemplaza esto con la URL de tu API

  constructor(private http: HttpClient) { }

  getEstadoCajero(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/estadoCajero`); // Reemplaza '/estadoCajero' con la ruta correcta de tu API
  }

  setEstadoCajero(nuevoEstado: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/estadoCajero`, { estado: nuevoEstado }); // Reemplaza '/estadoCajero' con la ruta correcta de tu API
  }
}