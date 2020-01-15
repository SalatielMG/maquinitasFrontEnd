import { Injectable } from '@angular/core';
import { URL } from '../Utilerias/app.config';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Devolucion } from '../../Modelos/Devolucion/devolucion';

@Injectable({
  providedIn: 'root'
})
export class DevolucionService {

  public msj: string = "";
  public indexDevolucionSelected: number = 0;
  public Devoluciones1: Devolucion[] = [];
  public Devoluciones5: Devolucion[] = [];

  constructor(public httpClient: HttpClient) { }
  public resetDevoluciones(tipo: number) {
    this.msj = "";
    if (tipo == 1) {
      this.Devoluciones1 = [];
    } else {
      this.Devoluciones5 = [];
    }
  }
  public cargarDevoluciones(idUsuario, tokenUsuario, tipo): Observable<any> {
    return this.httpClient.get(URL + "devolucion/cargarDevoluciones", {params: {
        id: idUsuario,
        token: tokenUsuario,
        tipo: tipo,
    }});
  }
  public agregarDevolucion(idUsuario, tokenUsuario, Devolucion): Observable<any> {
    return this.httpClient.post(URL + "devolucion/agregarDevolucion", new HttpParams()
        .append('id', idUsuario)
        .append('token', tokenUsuario)
        .append('devolucion', JSON.stringify(Devolucion)));
  }
  public actualizarDevolucion(idUsuario, tokenUsuario, Devolucion): Observable<any> {
    return this.httpClient.put(URL + "devolucion/actualizarDevolucion", new HttpParams()
        .append('id', idUsuario)
        .append('token', tokenUsuario)
        .append('devolucion', JSON.stringify(Devolucion)));
  }
  public eliminarDevolucion(idUsuario, tokenUsuario, idDev, tipoDev): Observable <any> {
    return this.httpClient.delete(URL + "devolucion/eliminarDevolucion", {params: {
        id: idUsuario,
        token: tokenUsuario,
        idDev: idDev,
        tipoDev: tipoDev
      }});
  }
}
