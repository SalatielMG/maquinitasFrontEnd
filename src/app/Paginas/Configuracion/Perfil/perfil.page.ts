import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../Servicios/Usuario/usuario.service';
import { AlertController, ModalController } from '@ionic/angular';
import { UtileriasService } from '../../../Servicios/Utilerias/utilerias.service';
import { ModalActualizarContraseAPage } from './ModalActualizarContraseña/modal-actualizar-contraseña.page';
import { ModalActualizarImagenPage } from './ModalActualizarImagen/modal-actualizar-imagen.page';
import { environment } from '../../../../environments/environment';
const { URL } = environment;
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(public usuarioService: UsuarioService,
              private alertController: AlertController,
              private util: UtileriasService,
              private modalController: ModalController) { }

  ngOnInit() {
  }

  public async confirmPasswordCurrent(password = "") {
    const alert = await this.alertController.create({
      header: '¡ Confirmar contraseña !',
      message: 'Porfavor confirme su contraseña actual para seguir con el proceso',
      keyboardClose: false,
      backdropDismiss: false,
      translucent: true,
      inputs: [
        {
          name: 'passwordCurrent',
          type: 'password',
          placeholder: 'Contraseña actual',
          value: password
        },
      ],
      buttons: [
        {
          text: 'Cerrar',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Confirmar',
          cssClass: "primary",
          handler: (data) => {
            if (data.passwordCurrent == "") {
              this.util.msjToast("Porfavor proporcione la contraseña actual", "", true, false);
              return false;
            } else {
              this.util.crearLoading("Verificando contraseña").then(() => {
                this.usuarioService.confirmarContraseñaActual(data.passwordCurrent).subscribe(result => {
                  this.util.msjToast(result.msj, result.titulo, result.error);
                  console.log('Confirm Ok [Data]', data);
                  if (result.error) {
                    this.confirmPasswordCurrent(data.passwordCurrent);
                  } else {
                    this.presentModal();
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
  private async presentModal() {
    const modal = await this.modalController.create({
      component: ModalActualizarContraseAPage
    });
    return await modal.present();
  }
  public async updateProfile(email, usuario) {
    const alert = await this.alertController.create({
      header: '¡ Actualizar perfil !',
      message: 'Porfavor actualice los datos del formulario',
      backdropDismiss: false,
      inputs: [
        {
          name: 'newUsuario',
          type: 'text',
          placeholder: 'Nuevo nombre de usuario',
          value: usuario
        },
        {
          name: 'newEmail',
          type: 'email',
          placeholder: 'Nuevo correo electronico',
          value: email
        },
      ],
      buttons: [
        {
          text: 'Cerrar',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Actualizar',
          cssClass: "primary",
          handler: (data) => {
            if (data.newUsuario == "") {
              this.util.msjToast("Porfavor ingrese un nombre de usuario", "", true, false);
              return false;
            } else if (data.newEmail == "") {
              this.util.msjToast("Porfavor ingrese un email", "", true, false);
              return false;
            } else {
              if (!this.util.validar_email(data.newEmail)) {
                this.util.msjToast("Porfavor ingrese un email valido", "", true, false);
                return false;
              }
              this.util.crearLoading("Actualizando el nuevo correo electronico").then(() => {
                this.usuarioService.actualizarPerfil(data).subscribe(result => {
                  this.util.msjToast(result.msj, result.titulo, result.error);
                  if (result.error) {
                    this.updateProfile(data.newEmail, data.newUsuario);
                  } else {
                    this.usuarioService.usuarioSession.usuario.email = data.newEmail;
                    this.usuarioService.usuarioSession.usuario.usuario = data.newUsuario;
                    this.usuarioService.actualizarUsuarioSessionStorage();
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

  public async tomarFoto() {
    const modal = await this.modalController.create({
      component: ModalActualizarImagenPage
    });
    return await modal.present();
  }

  public recargarPerfil(event) {
    this.usuarioService.recargarPerfil().subscribe(result => {
      this.util.msjToast(result.msj, result.titulo, result.error, false);
      if (!result.error) {
        this.usuarioService.usuarioSession.isSessionOpen = true;
        this.usuarioService.usuarioSession.usuario = result.usuario;
        this.usuarioService.actualizarUsuarioSessionStorage();
      }
      event.target.complete();
    }, error => {
      this.util.msjToastErrorInterno(error.message, false);
      event.target.complete();
    });
  }

  public rutaFoto(name): string {
    return URL + "avatar/" + name;
  }

}
