import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../Servicios/Usuario/usuario.service';
import { AlertController } from '@ionic/angular';
import {ConfiguracionService} from '../../Servicios/Configuracion/configuracion.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  constructor(private usuarioService: UsuarioService,
              private alertController: AlertController,
              public configuracionService: ConfiguracionService
              ) {
    console.log("configuracionService.configuracion.modeDark=>", this.configuracionService.configuracion.modeDark);
  }

  ngOnInit() {
  }

  public cambiarTema() {
      this.configuracionService.configuracion.modeDark = !this.configuracionService.configuracion.modeDark;
      this.configuracionService.actualizarConfiguracionStorage().then(() => {
        document.body.classList.toggle('dark');
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
            this.usuarioService.logout();
          }
        }
      ]
    });
    await alert.present();
  }

}
