import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import {TiposGasto} from '../../Modelos/TipoGasto/tiposGasto';

@Injectable({
  providedIn: 'root'
})
export class TiposGastosService {
  public tiposGasto = new TiposGasto();
  constructor() {
    this.obtenerTiposGastosStorage();
  }
  public async actualizarTiposGastosStorage() {
    await Storage.set({
      key: 'tiposGasto',
      value: JSON.stringify(this.tiposGasto)
    });
  }
  public async obtenerTiposGastosStorage() {
    const { value } = await Storage.get({ key: 'tiposGasto' });
    this.tiposGasto = (value != null) ? JSON.parse(value) : new TiposGasto();
  }
}
