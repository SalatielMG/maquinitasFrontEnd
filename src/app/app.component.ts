import {Component} from '@angular/core';

import { Platform } from '@ionic/angular';
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
export class AppComponent {
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
      url: '/tipoDevolucion',
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
    private configuracionService: ConfiguracionService
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
      await SplashScreen.hide();
      await StatusBar.setStyle({ style: StatusBarStyle.Dark });
      if (this.platform.is('capacitor')) {
        StatusBar.setBackgroundColor({ color: '#000000' });
      }
      console.log('App iniciada en movil');
    } catch (e) {
      console.log('Aplicación inicada en el navegador', e);
    }
  }

  public rutaFoto(name): string {
    return URL + "avatar/" + name;
  }

}
