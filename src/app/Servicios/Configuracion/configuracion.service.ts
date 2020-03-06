import { Injectable } from '@angular/core';
import { Configuracion } from '../../Modelos/Configuracion/configuracion';
import { Plugins } from '@capacitor/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { URL } from '../Utilerias/app.config';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  public configuracion = new Configuracion();
  constructor(private httpClient: HttpClient) {
    this.obtenerConfiguracionStorage();
  }
  public async obtenerConfiguracionStorage() {
    const { value } = await Storage.get({key: 'configuracion'});
    this.configuracion = (value != null) ? JSON.parse(value) : new Configuracion();
  }
  public async actualizarConfiguracionStorage() {
    await Storage.set({
      key: 'configuracion',
      value: JSON.stringify(this.configuracion)
    });
  }
  public actualizarMultipleSession(data): Observable<any> {
    return this.httpClient.post(URL + 'configuracion/actualizarMultipleSession', new HttpParams()
        .append('dataSession', JSON.stringify(data)));
  }
  public obtenerMultipleSession(idUsuario): Observable<any> {
    return this.httpClient.get(URL + 'configuracion/obtenerMultipleSession', {params: {
      idUsuario: idUsuario
      }});
  }
}
