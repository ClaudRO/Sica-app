import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuariosModel } from 'src/app/pages/usuarios.model';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  
  private URL = 'http://localhost:3000/api/v1/usuarios';
  constructor(private http:HttpClient) { }

  crearUsuario(newUsuario: UsuariosModel): Observable<UsuariosModel> {
    return this.http.post<UsuariosModel>(this.URL, newUsuario);
  }
  validarCorreo(correo:string):Observable<boolean>{
    return this.http.get<UsuariosModel[]>(this.URL).pipe(
      map(usuarios => {
        const usuario1= usuarios.find(u => u.correo === correo);
        if(usuario1){
          return false;
        }else{
          return true;
        }
      })
    );
  }
}
