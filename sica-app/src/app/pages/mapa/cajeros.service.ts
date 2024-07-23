import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cajero } from './cajeros';
import { BancoModel } from './bancos'
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class CajerosService {
  private apiUrl = 'http://localhost:3000/api/v1/cajeros';
  private apiUrl2 = 'http://localhost:3000/api/v1/bancos';

  constructor(private http: HttpClient) {}

  crearCajero(newCajero: Cajero): Observable<Cajero> {
    return this.http.post<Cajero>(this.apiUrl, newCajero);
  }
  // Obtener todos los cajeros
  getCajeros(): Observable<Cajero[]> {
    return this.http.get<Cajero[]>(this.apiUrl);
  }
  
  getCajeroById(cajeroId: number): Observable<Cajero> {
    return this.http.get<Cajero>(`${this.apiUrl}/${cajeroId}`);
  }

  // Calcular la distancia entre dos puntos geográficos
  getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distancia en km
    return d;
  }

  // Obtener cajeros cercanos dentro de un radio específico
  getNearbyCajeros(lat: number, lon: number, radius: number): Observable<Cajero[]> {
    return this.http.get<Cajero[]>(this.apiUrl).pipe(
      map((cajeros) =>
        cajeros.filter((cajero) => {
          const distance = this.getDistanceFromLatLonInKm(
            lat,
            lon,
            cajero.Latitud,
            cajero.Longitud
          );
          return distance <= radius;
        })
      )
    );
  }
}
    