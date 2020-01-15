import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsuarioService} from '../../Servicios/Usuario/usuario.service';
import {Router} from '@angular/router';
import {UtileriasService} from '../../Servicios/Utilerias/utilerias.service';
import {AlertController, ModalController} from '@ionic/angular';
import {ModalRestablecerContrasenaPage} from './ModalRestablecerContrasena/modal-restablecer-contrasena.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public usuario: FormGroup = null;

  constructor(private usuarioService: UsuarioService,
              private util: UtileriasService,
              private formBuilder: FormBuilder,
              private router: Router,
              private alertController: AlertController,
              private modalController: ModalController) {
    this.construirFormulario();
  }

  ngOnInit() {
  }

  private construirFormulario() {
    this.usuario = this.formBuilder.group({
      usuarioORemail: [
          '',
        {
          validators: [Validators.required]
        }
      ],
      password: [
          '',
          Validators.required
      ]
    });
  }

  public login() {
    this.util.crearLoading('Comprobando datos').then(() => {
      this.usuarioService.login(this.usuario.value).subscribe(result => {
        this.util.msjToast(result.msj, result.titulo, result.error);
        if (!result.error) {
          this.usuarioService.usuarioSession.isSessionOpen = true;
          this.usuarioService.usuarioSession.usuario = result.usuario;
          this.usuarioService.actualizarUsuarioSessionStorage().then(() => {
            this.router.navigate(['/home']);
          })
        }
      }, error => {
        this.util.msjToastErrorInterno(error.message);
      });
      console.log(this.usuario.value);
    });
  }

  public async verifyEmail(email: string = "") {
    const alert = await this.alertController.create({
      header: '¡ Confirmar email de registro !',
      message: '<h6 class="ion-text-justify">Porfavor confirme su correo electronico de registro para recibir un codigo de confirmación para el restablecimiento de su contraseña</h6>',
      backdropDismiss: false,
      inputs: [
        {
          name: 'emailRegister',
          type: 'email',
          placeholder: 'email de registro',
          value: email
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Verificar',
          cssClass: 'primary',
          handler: (data) => {
            if (data.emailRegister == "") {
              this.util.msjToast("Porfavor ingrese un email", "", true, false);
              return false;
            } else {
              if (!this.util.validar_email(data.emailRegister)) {
                this.util.msjToast("Porfavor ingrese un email valido", "", true, false);
                return false;
              }
              this.util.crearLoading("Verificanco correo electronico").then(() => {
                this.usuarioService.verificarEmailRegister(data.emailRegister).subscribe(result => {
                  this.util.msjToast(result.msj, result.titulo, result.error);

                  if (!result.error) { //Verificado
                    this.verifyCode(data.emailRegister);
                  } else {
                    this.verifyEmail(data.emailRegister);
                  }

                  return !result.error;
                }, error => {
                  this.util.msjToastErrorInterno(error.message);
                  return false;
                });
              });
            }
          }

        }
      ]
    });
    await alert.present();
  }

  public async verifyCode(email: string, code: string = "") {
    const alert = await this.alertController.create({
      header: '¡ Confirmar codigo !',
      message: '<h6 class="ion-text-justify">Porfavor confirme el codigo que recibio en su correo electronico, para poder continuar con el proceso de restablecimiento de su contraseña</h6>',
      backdropDismiss: false,
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: 'Codigo',
          value: code
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Confirmar',
          cssClass: 'primary',
          handler: (data) => {
            if (data.code == "") {
              this.util.msjToast("Porfavor el codigo que recibio en a su correo electronico", "", true, false);
              return false;
            } else {
              this.util.crearLoading("Verificando codigo").then(() => {
                this.usuarioService.verificarCode(data.code, email).subscribe(result => {
                  this.util.msjToast(result.msj, result.titulo, result.error);

                  if (!result.error) {
                    // Lanzar modal.
                    this.abrirModalRestablecerContraseña(email);
                  } else {
                    this.verifyCode(email, data.code);
                  }

                  return !result.error;
                }, error => {
                  this.util.msjToastErrorInterno(error.message);
                  return false;
                });
              });

            }
          }

        }
      ]
    });
    await alert.present();
  }

  private async abrirModalRestablecerContraseña(email) {
    const modal = await this.modalController.create({
      component: ModalRestablecerContrasenaPage,
      componentProps: {
        'email': email
      }
    });
    return await modal.present();
  }

}
