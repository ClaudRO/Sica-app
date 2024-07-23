import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BancoModel } from '../pages/mapa/bancos';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:3000/api/v1/bancos'
  listarBancos(): Observable<BancoModel[]> {
    return this.http.get<BancoModel[]>(this.apiUrl);
    
  }
  
  
  nombresReptidosBancos(nombreIngresado: string, bancoid: number): Observable<boolean> {

    return this.http.get<BancoModel[]>(`${this.apiUrl}`).pipe(
      map((bancos: BancoModel[]) => {
        const BancoEncontrado = bancos.find(bancos => bancos.id === bancoid && bancos.nombre === nombreIngresado);
        if (BancoEncontrado==undefined) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
  
  
  getBancoById(bancoId: number): Observable<BancoModel> {
    return this.http.get<BancoModel>(`${this.apiUrl}/${bancoId}`);
  }
  
  agregarBanco(BancoData: any): Observable<any> {
    const url = `${this.apiUrl}/agregarBank`; // Ajusta la URL según tu estructura de rutas
    return this.http.post(url, BancoData);
  }
  
  actualizarBanco(Banco:any):Observable<BancoModel>{
    return this.http.put<BancoModel>(`${this.apiUrl}/${Banco.id}`,Banco)
  }
  eliminarBanco(Banco:any):Observable<BancoModel>{
    return this.http.delete<BancoModel>(`${this.apiUrl}/${Banco.id}`)
  }
}
