import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { Observable } from 'rxjs';
const { Storage } = Plugins;
import { URL } from '../Utilerias/app.config';
import {TiposGasto} from '../../Modelos/TipoGasto/tiposGasto';

@Injectable({
  providedIn: 'root'
})
export class TiposGastosService {
  public tiposGasto = new TiposGasto();
  constructor(private platform: Platform) {
    this.obtenerTiposGastosStorage();
  }
  public async actualizarTiposGastosStorage() {
    if (this.platform.is('capacitor')) {
      await Storage.set({
        key: 'tiposGasto',
        value: JSON.stringify(this.tiposGasto)
      });
    } else {
      await localStorage.setItem('tiposGasto', JSON.stringify(this.tiposGasto));
    }
  }
  public async obtenerTiposGastosStorage() {
    let value;
    if (this.platform.is('capacitor')) {
      value = { value } = await Storage.get({ key: 'tiposGasto' });
    } else {
      value = await localStorage.getItem('tiposGasto');
    }
    this.tiposGasto = (value != null) ? JSON.parse(value) : new TiposGasto();
  }
}
