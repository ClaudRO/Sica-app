import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { EstadoCajero } from '../pages/mapa/estado-cajero';

@Injectable({
  providedIn: 'root'
})
export class EstadoCajeroService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:3000/api/v1/estadoCajeros'
  listarEstados(): Observable<EstadoCajero[]> {
    return this.http.get<EstadoCajero[]>(this.apiUrl);
    
  }
  
  
  /*nombresReptidosBancos(nombreIngresado: string, bancoid: number): Observable<boolean> {

    return this.http.get<EstadoCajero[]>(`${this.apiUrl}`).pipe(
      map((bancos: EstadoCajero[]) => {
        const BancoEncontrado = bancos.find(bancos => bancos.id === bancoid && bancos.nombre === nombreIngresado);
        if (BancoEncontrado==undefined) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
  */
  
  getEstadoById(EstadoId: number): Observable<EstadoCajero> {
    return this.http.get<EstadoCajero>(`${this.apiUrl}/${EstadoId}`);
  }
  
  agregarEstado(EstadoData: any): Observable<any> {
    const url = `${this.apiUrl}/agregarEstado`; // Ajusta la URL según tu estructura de rutas
    return this.http.post(url, EstadoData);
  }
 
  
  actualizarEstado(Estado:any):Observable<EstadoCajero>{
    return this.http.put<EstadoCajero>(`${this.apiUrl}/${Estado.id}`,Estado)
  }
  eliminarBanco(Estado:any):Observable<EstadoCajero>{
    return this.http.delete<EstadoCajero>(`${this.apiUrl}/${Estado.id}`)
  }
}
