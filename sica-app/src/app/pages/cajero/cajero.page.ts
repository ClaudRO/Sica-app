import { Component, OnInit} from '@angular/core';
import { Cajero } from '../mapa/cajeros';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CajerosService } from '../mapa/cajeros.service';

@Component({
  selector: 'app-cajero',
  templateUrl: './cajero.page.html',
  styleUrls: ['./cajero.page.scss'],
})
export class CajeroPage implements OnInit {


  registerForm: FormGroup;
  
  cajero: Cajero = {
  id:NaN,
  direccion: "",
  Latitud: NaN,
  Longitud: NaN,
  BancoId: NaN,
  }
  /*por el momento lo usuarios se crean como administradores*/
  constructor(
    private formBuilder: FormBuilder,
    private servCajero: CajerosService,
    private router: Router,
    private toastController: ToastController,
  ) {
    this.registerForm = this.formBuilder.group({
      direccion: ['', Validators.required],
      Latitud: ['', Validators.required],
      Longitud: ['', Validators.required],
      BancoId: ['', Validators.required],
    });
    
  }

  ngOnInit() {
    
  }
  
  async crearCajero() {
  console.log("entro en crear cajero.............");
  const cajero: Cajero = {
      id:NaN,
      direccion: this.registerForm.value.direccion,
      Latitud: this.registerForm.value.Latitud,
      Longitud: this.registerForm.value.Longitud,
      BancoId: this.registerForm.value.BancoId,
  }       
  this.servCajero.crearCajero(cajero).subscribe(() => {
    console.log("el cajero del suscribe:",cajero);
    this.router.navigate(['/mapa']);
    });
        
      
  }
}

