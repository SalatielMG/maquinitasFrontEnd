import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { Observable } from 'rxjs';
const { Storage } = Plugins;
import {UsuarioSession} from '../../Modelos/Usuario/usuarioSession';
import { environment } from '../../../environments/environment';
const { URL } = environment;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuarioSession = new UsuarioSession();

  constructor(private httpClient: HttpClient,
              private router: Router) {
    this.obtenerUsuarioSessionStorage();
  }

  public sesionAbierta(): boolean {
    if (this.usuarioSession != null) {
      return this.usuarioSession.isSessionOpen;
    }
    return false;
  }
  public tipoUsuario(): string {
    let tipo: string = "Super Administrador";
    switch (this.usuarioSession.usuario.tipo) {
      case "admin":
        tipo = "Administrador";
        break;
      case "aux":
        tipo = "Auxiliar";
        break;
    }
    return tipo;
  }

  public async obtenerUsuarioSessionStorage() {
    const { value } = await Storage.get({key: 'usuarioSession'});
    this.usuarioSession = (value != null) ? JSON.parse(value) : new UsuarioSession();
  }

  public async actualizarUsuarioSessionStorage() {
    await Storage.set({
      key: 'usuarioSession',
      value: JSON.stringify(this.usuarioSession)
    });
  }

  public logout() {
    this.usuarioSession = new UsuarioSession();
    this.actualizarUsuarioSessionStorage().then(() => {
      this.router.navigate(['/login']);
    });
  }

  public cerrarSesion(): Observable<any> {
    return this.httpClient.post(URL + 'usuario/logout', new HttpParams()
        .append('id', this.usuarioSession.usuario.id.toString())
        .append('token', this.usuarioSession.usuario.token));
  }

  public login(data): Observable<any> {
    return this.httpClient.post(URL + 'usuario/login', new HttpParams().append('dataUsuario', JSON.stringify(data)));
  }

  public confirmarContraseñaActual(password: string): Observable<any> {
    return this.httpClient.post(URL + "usuario/confirmarContrasena", new HttpParams()
        .append('token', this.usuarioSession.usuario.token)
        .append('id', this.usuarioSession.usuario.id.toString())
        .append('password', password));
  }

  public actualizarPassword(newPassword: string): Observable<any> {
    return this.httpClient.post(URL + "usuario/actualizarContrasena", new HttpParams()
        .append('token', this.usuarioSession.usuario.token)
        .append('id', this.usuarioSession.usuario.id.toString())
        .append('newPassword', newPassword));
  }

  public restablecerPassword(email: string, newPassword: string): Observable<any> {
    return this.httpClient.post(URL + "usuario/restablecerContrasena", new HttpParams()
        .append('email', email)
        .append('newPassword', newPassword));
  }

  public actualizarPerfil(data: string): Observable<any> {
    return this.httpClient.post(URL + 'usuario/actualizarPerfil', new HttpParams()
        .append('token', this.usuarioSession.usuario.token)
        .append('id', this.usuarioSession.usuario.id.toString())
        .append('dataProfile', JSON.stringify(data)));
  }

  public verificarEmailRegister(email: string): Observable<any> {
    return this.httpClient.post(URL + 'usuario/verificarEmailRegister', new HttpParams()
        .append('emailRegister', email));
  }

  public verificarCode(code: string, email: string): Observable<any> {
    return this.httpClient.post(URL + 'usuario/verificarCode', new HttpParams()
        .append('email', email)
        .append('code', code));
  }

  public recargarPerfil(): Observable<any> {
    return this.httpClient.get(URL + 'usuario/recargarPerfil', {params: {token: this.usuarioSession.usuario.token, id: this.usuarioSession.usuario.id.toString()}});
  }

  public actualizarImagenPerfil(imgBase64): Observable<any> {
    const parametro = new FormData();
    parametro.append('token', this.usuarioSession.usuario.token);
    parametro.append('id', this.usuarioSession.usuario.id.toString());
    parametro.append('img', JSON.stringify({imgBase64: imgBase64.changingThisBreaksApplicationSecurity}));
    return this.httpClient.post(URL + 'usuario/atualizarImagenPerfil', parametro);
  }
  /*public verificarToken(): Observable<any> {
    return this.httpClient.post(URL + 'verificarToken', new HttpParams().append('token', this.usuarioSession.usuario.token).append('id', this.usuarioSession.usuario.id.toString()));
  }*/
}
