import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  private usuario: string = '';
  NombreUsuario: string = '';
  id: Number = NaN;

  constructor(private credencialesService: LoginService, private router: Router) { }

  ngOnInit() {
    // Verificar si el usuario ha iniciado sesión al cargar la página

  }

  ionViewWillEnter() {
    // Redirigir a la página de inicio de sesión si no hay un token válido
    if (this.credencialesService.getToken()) {
      this.obtenerCredenciales();
    }
  }

  obtenerCredenciales() {
    const IdUsuario = this.credencialesService.getUserIdFromLocalStorage();
    if (IdUsuario !== null) {
      this.credencialesService.getUsuario(IdUsuario).subscribe((usuario) => {
        // Almacena la información del usuario en variables locales
        this.NombreUsuario = usuario.nombre;
        // Puedes almacenar más información del usuario si es necesario
      });
    } else {
      console.error('ID de usuario no válido');
    }
  }

  logout() {
    this.credencialesService.setCredenciales("", ""); 
    this.credencialesService.setNombreUsuario(""); 
    this.NombreUsuario = ''; 
    this.id = NaN;
    localStorage.removeItem('access_token');
    this.router.navigate(['/inicio']);
  }
}
