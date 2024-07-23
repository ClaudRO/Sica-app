import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { CajerosService } from './cajeros.service';
import { Cajero } from './cajeros';
import { Observable, catchError, map, of } from 'rxjs';
import { BancoModel as Banco} from './bancos';
import {BancoService} from '../../servicios/banco.service'
import {EstadoCajero} from './estado-cajero'
import {EstadoCajeroService} from '../../servicios/estado-cajero.service'
import {Router, RouterLink} from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  map!: google.maps.Map; 
  cajeros: Cajero[] = [];
  bancos: Banco[] = [];
  estados: EstadoCajero[] = [];
  infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow();
  selectedBanco: string = '';
  selectedEstadoOpGeneral: boolean | '' = '';
  selectedEstadoHabDepo: boolean | '' = '';
  
  static bancoIconos = {
    1: '../../../assets/icon/iconobancoestado.png',
    2: '../../../assets/icon/iconobancosantander.png',
    3: '../../../assets/icon/iconobancodechile.png'
    // Agrega más según sea necesario
  };
  origin = { lat: -33.442338, lng: -70.65394 };

  constructor(
    private cajerosService: CajerosService,
    private servBancos : BancoService,
    private servEstado : EstadoCajeroService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadMap();
    await this.setCurrentLocation();
    await this.loadNearbyCajeros();
    await this.loadBancos();
    await this.loadEstados();
    await this.loadFiltroCajeros();
  }
  async ionViewWillEnter() {
    // Actualizar información al entrar en la página
    await this.loadNearbyCajeros();
    await this.loadBancos();
    await this.loadEstados();
    await this.loadFiltroCajeros();
  }
  getNombreBanco(bancoID: number): string {
    const banco = this.bancos.find(banco => banco.id === bancoID);
    return banco ? banco.nombre : 'Desconocido';
  }
  getBancoDescripcion(bancoId: number): string{
    const banco = this.bancos.find(banco => banco.id === bancoId);
    return banco ?  banco.descripcion: 'Descripcion no disponible';
  }

  getDistance(lat: number, lng:number): string{
    const distance = this.cajerosService.getDistanceFromLatLonInKm(
      this.origin.lat,
      this.origin.lng,
      lat,
      lng,
    );
    return distance.toFixed(2);
  }

  loadBancos() {
    this.servBancos.listarBancos().subscribe({
      next: (bancos: Banco[]) => {
        this.bancos = bancos;
        this.showMarkers();

      },
      error: (error) => {
        console.error('Error al cargar la lista de bancos:', error);
        // Aquí puedes agregar lógica adicional para manejar el error, como mostrar un mensaje al usuario
      }
    });
  }
  loadEstados() {
    this.servEstado.listarEstados().subscribe({
      next: (estados: EstadoCajero[]) => {   
        this.estados = estados;
      },
      error: (error) => {
        console.error('Error al cargar la lista de estados:', error);
        // Aquí puedes agregar lógica adicional para manejar el error, como mostrar un mensaje al usuario
      }
    });
    
  }
 
  loadFiltroCajeros() {
    this.cajerosService.getCajeros().subscribe((cajeros: Cajero[]) => {
      let filtroCajeros = cajeros;
      if (this.selectedBanco !== '' || this.selectedEstadoOpGeneral !== '' || this.selectedEstadoHabDepo !== '') {
        filtroCajeros = cajeros.filter((cajero) => {
          const estado = this.estados.find(estado => estado.CajeroId === cajero.id);
          return (this.selectedBanco === '' || cajero.BancoId.toString() === this.selectedBanco) &&
                 (this.selectedEstadoOpGeneral === '' || (estado && estado.op_general === this.selectedEstadoOpGeneral)) &&
                 (this.selectedEstadoHabDepo === '' || (estado && estado.hab_depo === this.selectedEstadoHabDepo));
        });
      }
      this.cajeros = filtroCajeros.sort((a, b) => {
        const distanceA = this.cajerosService.getDistanceFromLatLonInKm(this.origin.lat, this.origin.lng, a.Latitud, a.Longitud);
        const distanceB = this.cajerosService.getDistanceFromLatLonInKm(this.origin.lat, this.origin.lng, b.Latitud, b.Longitud);
        return distanceA - distanceB;
      });
      this.showMarkers();
    });
  }
  
  
  async loadNearbyCajeros() {
    this.cajerosService
.getNearbyCajeros(this.origin.lat, this.origin.lng, 5) 
      .subscribe((cajeros: Cajero[]) => { 
        const filteredCajeros = cajeros.filter(cajero => this.selectedBanco === '' ||
         cajero.BancoId.toString() === this.selectedBanco);
        // Ordenar cajeros por distancia

        this.cajeros = filteredCajeros.sort((a, b) => {
          const distanceA = this.cajerosService.getDistanceFromLatLonInKm(
            this.origin.lat,
            this.origin.lng,
            a.Latitud,
            a.Longitud
          );
          const distanceB = this.cajerosService.getDistanceFromLatLonInKm(
            this.origin.lat,
            this.origin.lng,
            b.Latitud,
            b.Longitud
          );
          return distanceA - distanceB;
        });
        this.showMarkers();
      });
  }
  
 
  showMarkers() {
    this.cajeros.forEach((cajero: Cajero) => {
        const nombreBanco = this.getNombreBanco(cajero.BancoId);
        const direccion = cajero.direccion;
        const distancia = this.cajerosService.getDistanceFromLatLonInKm(
            this.origin.lat,
            this.origin.lng,
            cajero.Latitud,
            cajero.Longitud
        ).toFixed(2);
        const titulo = `${nombreBanco} - ${direccion} - (${distancia} km)`;
        
        
        let iconUrl = 'assets/icon/cajero-automatico.png'; // Icono por defecto

        // Verificar alguna condición para determinar el icono
        if (cajero.BancoId === 1) {
            iconUrl = MapaPage.bancoIconos[1];
        } else if (cajero.BancoId === 2) {
            iconUrl = MapaPage.bancoIconos[2];
        } else if (cajero.BancoId === 3) {
            iconUrl = MapaPage.bancoIconos[3];
        }

        // Objeto común a ambos casos
        const markerOptions = {
            position: { lat: cajero.Latitud, lng: cajero.Longitud },
            title: titulo,
            icon: {
                url: iconUrl,
                scaledSize: new google.maps.Size(25, 25),
            },
            cajero: cajero
        };

        // Agregar marcador si no hay filtro de banco o si coincide con el banco seleccionado
        if (this.selectedBanco === '' || cajero.BancoId.toString() === this.selectedBanco) {
            this.addMarker(markerOptions);
        }
    });
  } 
  
  

  async loadMap() {
    const mapEle: HTMLElement = document.getElementById('map')!;
    this.map = new google.maps.Map(mapEle, {
      center: this.origin,
      zoom: 15,
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
    });
  }

  async setCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.origin = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      };
      this.map.setCenter(this.origin); 
      this.addMarker({
        position: this.origin,
        title: 'Ubicación actual',
      });
    } catch (e) {
      console.error('Error getting location', e);
    }
  }

  addMarker(
    marker: { position: { lat: number; lng: number };
    title: string; 
    icon?:{url:string; scaledSize?: {width: number; height: number};};
    cajero?: Cajero;
  }) 
   {
    const mapMarker = new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title,
      icon: marker.icon,
    });

    if (marker.cajero){
      mapMarker.addListener('click', (cajero:Cajero) =>{
        const direccion = marker.cajero!.direccion;
        const nombreBanco = this.getNombreBanco(marker.cajero!.BancoId);
        const descripcion = this.getBancoDescripcion(marker.cajero!.BancoId);
        const estadoCajero = this.estados.find(estado => estado.CajeroId === cajero.id);
        const estado = estadoCajero ? estadoCajero.op_general : 'Desconocido';
        const estado2= estadoCajero ? estadoCajero.hab_depo : 'Desconocido';

        const contentString = `
        <div>
        <div>
        <h2 style="color: blue;">${nombreBanco}</h2>
        <p style="color: black;"><strong style="color: green;">Dirección:</strong> ${direccion}</p>
        <p style="color: black;"><strong style="color: red;">Descripción:</strong> ${descripcion}</p>
        <p style="color: black;"><strong style="color: purple;">Operativo:</strong> ${estado}</p>
        <p style="color: black;"><strong style="color: purple;">Habilitado para depositos:</strong> ${estado2}</p>
        <ion-button id="feedbackButton" style="font-size: 16px;width: 95%">Actualizar estado</ion-button>
        
      </div>
        </div>`;

        this.infoWindow.setContent(contentString);
        this.infoWindow.open(this.map, mapMarker);
        google.maps.event.addListenerOnce(this.infoWindow, 'domready', ()=>{
          document.getElementById('feedbackButton')?.addEventListener('click',()=>{
          if(marker.cajero){
            this.feedback(marker.cajero.id);
          }
          });
        });
      });
    }
    return mapMarker;
  }
  async feedback(cajeroId: number){
    this.infoWindow.close();
    this.router.navigate(['/comentarios', cajeroId]);
  }
  
  
  async onCajeroClick(cajero: Cajero) {
    const direccion = cajero.direccion;
    const nombreBanco = this.getNombreBanco(cajero.BancoId);
    const descripcion = this.getBancoDescripcion(cajero.BancoId);

    
    
  
    // Buscar el estado del cajero seleccionado
    const estadoCajero = this.estados.find(estado => estado.CajeroId === cajero.id);
    const estado = estadoCajero ? estadoCajero.op_general : 'Desconocido';
    
    const estado2= estadoCajero ? estadoCajero.hab_depo : 'Desconocido';
    

    const contentString = `
      <div>
        <h2 style="color: blue;">${nombreBanco}</h2>
        <p style="color: black;"><strong style="color: green;">Dirección:</strong> ${direccion}</p>
        <p style="color: black;"><strong style="color: red;">Descripción:</strong> ${descripcion}</p>
        <p style="color: black;"><strong style="color: purple;">Operativo:</strong> ${estado}</p>
        <p style="color: black;"><strong style="color: purple;">Habilitado para depositos:</strong> ${estado2}</p>
        <ion-button id="feedbackButton" style="font-size: 16px;width: 95%">Actualizar estado</ion-button>
        
      </div>
    `;
    /*width: 80%; 
    max-width: 800px;
    margin: 0 auto;
    margin-top: 5%; 
    border: 2px solid #ccc; 
    padding: 20px; 
    border-radius: 10px;

    */
  
    // Si aún no se ha creado el InfoWindow, créalo
    if (!this.infoWindow) {
      this.infoWindow = new google.maps.InfoWindow();
    }
  
    // Actualiza el contenido del InfoWindow con los detalles del cajero
    this.infoWindow.setContent(contentString);
  
    // Centra el InfoWindow en la posición del cajero seleccionado
    const position = { lat: cajero.Latitud + 0.0015, lng: cajero.Longitud };
    this.infoWindow.setPosition(position);
  
    // Agrega un evento de clic al botón dentro del infoWindow
    this.infoWindow.open(this.map);

    
    // Centra el mapa en la posición del cajero seleccionado
    this.map.panTo(position);
    this.infoWindow.addListener('domready', () => {
      const infoWindowElement = document.getElementById('feedbackButton');
      if (infoWindowElement) {
          infoWindowElement.addEventListener('click', () => {
              this.feedback(cajero.id); // Envía el ID del cajero al hacer clic en el botón
          });
        }
    });
  }
  
}
