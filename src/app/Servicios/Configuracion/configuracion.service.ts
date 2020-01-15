import { Injectable } from '@angular/core';
import { Configuracion } from '../../Modelos/Configuracion/configuracion';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  public configuracion = new Configuracion();
  constructor(private platform: Platform) {
    this.obtenerConfiguracionStorage();
  }
  public async obtenerConfiguracionStorage() {
    let value;
    if (this.platform.is('capacitor')) {
      value = { value } = await Storage.get({key: 'configuracion'});
    } else {
      value = await localStorage.getItem('configuracion');
    }
    this.configuracion = (value != null) ? JSON.parse(value) : new Configuracion();
  }
  public async actualizarConfiguracionStorage() {
    if (this.platform.is('capacitor')) {
      await Storage.set({
        key: 'configuracion',
        value: JSON.stringify(this.configuracion)
      });
    } else {
      await localStorage.setItem('configuracion', JSON.stringify(this.configuracion));
    }
  }
}
