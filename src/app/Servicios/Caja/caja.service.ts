import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import { URL } from '../Utilerias/app.config';
import { CajaAbierta } from '../../Modelos/Caja/Abierta/cajaAbierta';
import { VistaCajaClose } from '../../Modelos/Caja/Cerradas/vistaCajaClose';
import { BusquedaCajasCerradas } from '../../Modelos/Caja/Cerradas/dataFiltros';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  //Variables Caja Abierto
  public msj: string = "";
  public cajaAbierta = new CajaAbierta();
  //Variables Caja Abierto

  //Variables Cajas Cerradas
  public cajasCerradas: VistaCajaClose[] = [];
  public pagina: number = 0;
  public dataFiltros = new BusquedaCajasCerradas();
  public dataFiltrosSelect = [];
  //Variables Cajas Cerradas

  constructor(private httpClient: HttpClient,
              private router: Router,
              private platform: Platform) {
    this.obtenerCajaAbiertaStorage();
  }

  public resetCajasCerradas() {
    this.cajasCerradas = [];
    this.pagina = 0;
  }

  public resetDataFiltrosBusqueda() {
    this.dataFiltros = new BusquedaCajasCerradas();
    this.dataFiltrosSelect = [];
  }

  public isCajaAbierta(): boolean {
    if (this.cajaAbierta != null) return this.cajaAbierta.isOpen;
    return false;
  }

  public async actualizarCajaAbiertaStorage() {
    if (this.platform.is('capacitor')) {
      await Storage.set({
        key: 'cajaAbierta',
        value: JSON.stringify(this.cajaAbierta)
      });
    } else {
      await localStorage.setItem('cajaAbierta', JSON.stringify(this.cajaAbierta));
    }
  }
  public async obtenerCajaAbiertaStorage() {
    let value;
    if (this.platform.is('capacitor')) {
      value = { value } = await Storage.get({ key: 'cajaAbierta' });
    } else {
      const value = await localStorage.getItem('cajaAbierta');
    }
    this.cajaAbierta = (value != null) ? JSON.parse(value) : new CajaAbierta();
  }

  /*
  * Peticiones HTTP
  * */
  public cargarDatos(id, token) : Observable<any> {
    return this.httpClient.get(URL + 'caja/cargarDatos', {params: {id: id, token: token}});
  }
  public obtenerCajaAbierta(id: string, token: string): Observable<any> {
    return this.httpClient.get(URL + 'caja/obtCajaAbierta', {params: {id: id, token: token}});
  }
  public agregarCaja(id, token, caja): Observable<any> {
    return this.httpClient.post(URL + 'caja/agregarCaja', new HttpParams()
        .append("id", id)
        .append("token", token)
        .append("caja", JSON.stringify(caja)));
  }
  public actualizarCaja(id, token, caja): Observable<any> {
    return this.httpClient.put(URL + 'caja/actualizarCaja', new HttpParams()
        .append("id", id)
        .append("token", token)
        .append("caja", JSON.stringify(caja)));
  }
  public cerrarCaja(id, token, idC, data): Observable<any> {
    return this.httpClient.put(URL + "caja/cerrarCaja", new HttpParams()
        .append("id", id)
        .append("token", token)
        .append("idC", idC)
        .append("data", JSON.stringify(data)));
  }
  public obtenerCajasCerradas(id: string, token: string): Observable<any> {
    return this.httpClient.get(URL + 'caja/obtCajasCerradas', {params: {
      id: id,
      token: token,
      pagina: this.pagina.toString(),
      dataBusqueda: JSON.stringify({
        isSearch: this.dataFiltros.isSearch,
        dataFiltrosBusquedaCajasCerradas: this.dataFiltros.dataFiltros.value
      })
    }});
  }
  public generarReport(id: string, token: string, idCaja: number, type: number): Observable<any> {
    return this.httpClient.get(URL + 'caja/generarReporte', {params: {
      id: id,
      token: token,
      idCaja: idCaja.toString(),
      type: type.toString()
    }});
  }
}
