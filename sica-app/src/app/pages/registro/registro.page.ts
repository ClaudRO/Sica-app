import { Component, OnInit} from '@angular/core';
import { UsuariosModel } from '../usuarios.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RegistroService } from '../registro/usuarios.service.service';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {

  registerForm: FormGroup;
  
  usuario: UsuariosModel = {
  id:NaN,
  nombre: "",
  apellido: "",
  contrasenia: "",
  fechaDeNacimiento: new Date(1998, 11, 23),
  correo: "",
  numeroCelular: NaN,
  PerfilPrivilegioId: 2,
  }
  /*por el momento lo usuarios se crean como administradores*/
  constructor(
    private formBuilder: FormBuilder,
    private servicioUser: RegistroService,
    private router: Router,
    private toastController: ToastController,
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaDeNacimiento: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+-.,'¿"]).{8,}$/)]],
      repetir_contrasenia: ['', Validators.required],
      numeroCelular: ['', [Validators.required,Validators.minLength(8)]]
    });
    
  }

  ngOnInit() {
    
  }
  showPasswordValidation: boolean = false;

  showPasswordValidationMessage() {
    this.showPasswordValidation = true;
  }
  hidePasswordValidationMessage() {
    this.showPasswordValidation = false;
  }  

  verificarFechaNacimiento(): boolean {
    const fechaNacimiento = new Date(this.registerForm.value.fechaDeNacimiento);
    const hoy = new Date();
    const edadMinima = 11; // Edad mínima permitida

    const diffYears = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const diffMonths = hoy.getMonth() - fechaNacimiento.getMonth();
    const diffDays = hoy.getDate() - fechaNacimiento.getDate();

    if (diffYears < edadMinima) {
      return false;
    } else if (diffYears === edadMinima) {
      if (diffMonths < 0) {
        return false;
      } else if (diffMonths === 0 && diffDays < 0) {
        return false;
      }
    }
    return true;
  }
  
  async crearUsuario() {
    if (!this.verificarFechaNacimiento()) {
      const toast = await this.toastController.create({
        message: 'La fecha de nacimiento es inválida. La edad mínima permitida es de 11 años.',
        duration: 3000,
        position: 'bottom',
        color: 'danger',
      });
      toast.present();
    }else if (this.registerForm.value.contrasenia !== this.registerForm.value.repetir_contrasenia) {
      const toast = await this.toastController.create({
        message: 'Las contraseñas no coinciden.',
        duration: 3000,
        position: 'bottom',
        color: 'danger',
      });
      toast.present();
      return;
    } else {
      this.servicioUser.validarCorreo(this.registerForm.value.correo).subscribe(async (correoValido: boolean) => {
        if (correoValido) {
          const usuario: UsuariosModel = {
            id:NaN,
            nombre: this.registerForm.value.nombre,
            apellido: this.registerForm.value.apellido,
            contrasenia: this.registerForm.value.contrasenia,
            fechaDeNacimiento: this.registerForm.value.fechaDeNacimiento,
            correo: this.registerForm.value.correo,
            numeroCelular: this.registerForm.value.numeroCelular,
            PerfilPrivilegioId:2,
          };
          this.servicioUser.crearUsuario(usuario).subscribe(() => {
            this.router.navigateByUrl('/folder/inbox');
          });
        } else {
          const toast = await this.toastController.create({
            message: 'Lo sentimos, el correo electrónico ingresado ya se encuentra asociado a una cuenta existente.',
            duration: 3000,
            position: 'bottom',
            color: 'danger',
          });
          toast.present();
        }
      });
    }
  }
}
