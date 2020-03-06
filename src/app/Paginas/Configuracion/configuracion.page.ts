import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../Servicios/Usuario/usuario.service';
import { AlertController } from '@ionic/angular';
import {ConfiguracionService} from '../../Servicios/Configuracion/configuracion.service';
import {UtileriasService} from '../../Servicios/Utilerias/utilerias.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  constructor(private usuarioService: UsuarioService,
              private alertController: AlertController,
              public configuracionService: ConfiguracionService,
              private util: UtileriasService
              ) {
    this.cargarConfiguracion();
  }

  ngOnInit() {
  }

  public recargarConfigMultipleSession(event) {
    this.cargarConfiguracion().then(() => {
      event.target.complete();
    });
  }

  public async cargarConfiguracion() {
    await this.configuracionService.obtenerMultipleSession(this.usuarioService.usuarioSession.usuario.id).subscribe(result => {
      //this.util.detenerLoading();
      if (!result.error) {
        this.configuracionService.configuracion.multipleSesion = result.multipleSession;
        this.configuracionService.actualizarConfiguracionStorage();
      } else {
        console.log("No se pudo cargar la configuracion de las sesiones multiples", this.configuracionService.configuracion);
      }
    }, error => {
      this.util.msjToastErrorInterno(error.message);
    });
  }

  public cambiarTema() {
      this.configuracionService.configuracion.modeDark = !this.configuracionService.configuracion.modeDark;
      this.configuracionService.actualizarConfiguracionStorage().then(() => {
        document.body.classList.toggle('dark');
      });
  }

  public cambiarSesionMultiple() {
    this.configuracionService.configuracion.multipleSesion = !this.configuracionService.configuracion.multipleSesion;
    let data = {
      idUsuario: this.usuarioService.usuarioSession.usuario.id,
      multipleSesion: this.configuracionService.configuracion.multipleSesion,
      usuario: {
        token: this.usuarioService.usuarioSession.usuario.token
      }
    };
    this.util.crearLoading(((this.configuracionService.configuracion.multipleSesion) ? "Habilitando" : "Deshabilitando") + ' sesiones multiples').then(() => {
      this.configuracionService.actualizarMultipleSession(data).subscribe(result => {
        this.util.detenerLoading();
        if (result.error) {
          this.configuracionService.configuracion.multipleSesion = !this.configuracionService.configuracion.multipleSesion;
          this.util.msjToast(result.msj, result.titulo, result.error, false);
        } else {
          this.configuracionService.actualizarConfiguracionStorage();
        }
      }, error => {
        this.util.msjToastErrorInterno(error.message);
      });
    });
  }

  public async confirmarCerrarSession() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión!',
      message: '¿ Esta seguro de cerrar la sesión actual en este dispositivo ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        }, {
          text: 'Cerrar sesión',
          cssClass: 'danger',
          handler: () => {
            this.util.crearLoading('Cerrando sesión').then(() => {
              this.usuarioService.cerrarSesion().subscribe(result => {
                this.util.detenerLoading();
                this.usuarioService.logout();
              }, error => {
                this.util.msjToastErrorInterno(error.message);
              });
            });
          }
        }
      ]
    });
    await alert.present();
  }

}
