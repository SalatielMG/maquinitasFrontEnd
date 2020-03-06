import { Injectable } from '@angular/core';
import {UsuarioService} from './usuario.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioSesionService {

  constructor(private usuarioService: UsuarioService) { }

  public closeSesion(): Observable<any> {
    return this.usuarioService.cerrarSesion();
  }

  public logoutSesion() {
    this.usuarioService.logout();
  }
}
