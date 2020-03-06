import { Injectable } from '@angular/core';
import { Gasto } from '../../Modelos/Gasto/Gasto';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
const { URL } = environment;

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  public msj: string = "";
  public indexGastoSelected: number = 0;
  public Gastos: Gasto[] = [];

  constructor(public httpClient: HttpClient) { }

  public resetGastos() {
    this.msj = "";
    this.Gastos = []
  }


  public cargarGastos(id, token): Observable<any> {
    return this.httpClient.get(URL + "gasto/cargarGastos", {params: {
        id: id,
        token: token,
      }});
  }

  public agregarGasto(id, token, Gasto): Observable<any> {
    return this.httpClient.post(URL + "gasto/agregarGasto", new HttpParams()
        .append('id', id)
        .append('token', token)
        .append('gasto', JSON.stringify(Gasto)));
  }

  public actualizarGasto(id, token, Gasto): Observable<any> {
    return this.httpClient.put(URL + "gasto/actualizarGasto", new HttpParams()
        .append('id', id)
        .append('token', token)
        .append('gasto', JSON.stringify(Gasto)));
  }

  public eliminarGasto(id, token, idGasto): Observable<any> {
    return this.httpClient.delete(URL + "gasto/eliminarGasto", {params: {
        id: id,
        token: token,
        idGasto: idGasto
      }});
  }

}
