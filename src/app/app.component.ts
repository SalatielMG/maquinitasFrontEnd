import { Component, OnDestroy } from '@angular/core';
import {AlertController, ModalController, Platform} from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { UsuarioService } from './Servicios/Usuario/usuario.service';
import { Router } from '@angular/router';
import { CajaService } from './Servicios/Caja/caja.service';
import { ConfiguracionService } from './Servicios/Configuracion/configuracion.service';
import { URL } from './Servicios/Utilerias/app.config';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy {

  backButtonSubscription;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Caja',
      url: '/caja',
      icon: 'archive'
    },
    {
      title: 'Devoluciones',
      url: '/devolucion',
      icon: 'backspace'
    },
    {
      title: 'Gastos',
      url: '/gasto',
      icon: 'cash'
    },
    {
      title: 'Cajas cerradas',
      url: '/cajasCerradas',
      icon: 'close-circle-outline'
    },
    {
      title: 'Configuración',
      url: '/configuracion',
      icon: 'settings'
    }
  ];
  constructor(
    private platform: Platform,
    public usuarioService: UsuarioService,
    public cajaService: CajaService,
    private router: Router,
    private configuracionService: ConfiguracionService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {
    this.initializeApp().then(() => {
      if (this.configuracionService.configuracion.modeDark) {
        document.body.classList.toggle('dark');
      }
      if (this.usuarioService.sesionAbierta()) {
        // Primero verificar el token de la sesion del ultimo dispositivo.
        // Cargar información del usuario, Caja abierta, tipos de gastos
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  async initializeApp() {
    const { SplashScreen, StatusBar } = Plugins;
    try {
      this.backButtonEvent();
      await SplashScreen.hide();
      await StatusBar.setStyle({ style: StatusBarStyle.Dark });
      if (this.platform.is('android') || this.platform.is('ios')) {
        StatusBar.setBackgroundColor({ color: '#000000' });
      }
      //console.log('App iniciada en movil');
    } catch (e) {
      //this.backButtonEvent();
      //console.log('Aplicación inicada en el navegador', e);
    }
  }

  public rutaFoto(name): string {
    return URL + "avatar/" + name;
  }

  ngOnDestroy(): void {
    this.backButtonSubscription.unsubscribe();
  }

  private backButtonEvent() {
    console.log(this.router.isActive('/devolucion', true));
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
      if (this.router.url == '/home'
      || this.router.url == '/caja'
      || this.router.url == '/devolucion'
      || this.router.url == '/gasto'
      || this.router.url == '/cajasCerradas'
      || this.router.url == '/configuracion'
      || this.router.url == '/login'
      ) {
        this.modalController.getTop().then(top => {
          this.alertController.getTop().then(t => {
            if (top == undefined && t == undefined) {
              this.confirmarCerrarApp();
            }
          });
        });
      }
    });
  }

  private async confirmarCerrarApp() {
    const alert = await this.alertController.create({
      header: 'Cerrar app',
      message: '¿ Esta seguro de salir de la aplicación ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        }, {
          text: 'Salir',
          cssClass: 'primary',
          handler: () => {
            navigator["app"].exitApp();
          }
        }
      ]
    });
    await alert.present();
  }

}
