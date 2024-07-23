 
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { CajerosService } from '../mapa/cajeros.service';
import { Cajero } from '../mapa/cajeros';
import { Observable, catchError, map, of } from 'rxjs';
import { BancoModel as Banco} from '../mapa/bancos';
import {BancoService} from '../../servicios/banco.service'
import {EstadoCajero} from '../mapa/estado-cajero'
import {EstadoCajeroService} from '../../servicios/estado-cajero.service'
import {Router, RouterLink, ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
declare var google: any;


@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  map!: google.maps.Map; 
  cajeros: Cajero[] = [];
  cajero: Cajero = {
    id:NaN,
    direccion:"",
    Latitud:NaN,
    Longitud:NaN,
    BancoId:NaN
  }

  banco: Banco = {
    id:NaN,
    nombre:"",
    descripcion:""
  }
  estado: EstadoCajero = {
    id:NaN,
    op_general:true,
    acces_disc:true, 
    hab_depo:true,
    CajeroId:NaN
  }
  estadoEditado: EstadoCajero = {
    id:NaN, // Crear una copia del estado actual para editar
    op_general: false, // Inicializar con valores actuales o predeterminados
    acces_disc: false,
    hab_depo: false,
    CajeroId: NaN
  };
  infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow();
  selectedBanco: string = '';
  origin = { lat: -33.442338, lng: -70.65394 };
  cajeroId: number=NaN;


  constructor(
    private cajerosService: CajerosService,
    private servBancos : BancoService,
    private servEstado : EstadoCajeroService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    // Obtener el ID del cajero de la URL
    this.subscription = this.route.params.subscribe(params => {
      this.cajeroId = +params['id'];
      
      // Aquí puedes usar this.cajeroId para cargar los comentarios específicos del cajero, por ejemplo
    });
    this.loadCajero(this.cajeroId);
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  loadCajero(id: number) {

    this.cajerosService.getCajeroById(id).subscribe((cajero: Cajero) => {
      
      this.cajero = cajero;
      this.loadBanco(this.cajero.BancoId);
      this.loadEstado(this.cajero.id);
      
    });
  }

  loadBanco(idbanco: number){
    this.servBancos.getBancoById(idbanco).subscribe((banco: Banco) => {
      this.banco = banco;
    });
  }
  loadEstado(idCajero:number){
    //aca el back esta listo para recibir el id del cajero buscado dentro de los estados 
    this.servEstado.getEstadoById(idCajero).subscribe({
      next: (estado: EstadoCajero) => {
      if (estado){
        this.estado = estado;
        console.log('Estado del cajero cargado correctamente:', estado);} // Aquí se imprime el estado del cajero
      else {
        console.error('no se encontro', idCajero);
      }
    },
    error: (error)=>{
      console.error('error:', error);
    }
   });
  }
  guardarCambios() {
    this.servEstado.actualizarEstado(this.estado).subscribe({
      next: (estadoActualizado: EstadoCajero) => {
        console.log('Estado del cajero actualizado correctamente:', estadoActualizado);
        this.router.navigate(['/mapa']); // Asegúrate de que navegar a '/mapa' no crea un ciclo
      },
      error: (error) => {
        console.error('Error al actualizar el estado del cajero:', error);
        
      }
    });
  }
  

  
}