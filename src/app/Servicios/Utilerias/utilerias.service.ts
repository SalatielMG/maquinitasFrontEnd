import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { errorInterno, exprRegEmail, nameMonth, dayName, operacion, opcionesFiltrosCajasCerradas } from './contantes';
import {UsuarioSesionService} from '../Usuario/usuario-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class UtileriasService {

  public exprRegular_2Decimal: string = "([0-9]+\.?[0-9]{0,2})";
  public newPassword: string = "";
  public operacion = operacion;
  public errorInterno = errorInterno;
  public opcionesFiltrosCajasCerradas = opcionesFiltrosCajasCerradas;

  constructor(private loadCtrl: LoadingController,
              private toastController: ToastController,
              private datePipe: DatePipe,
              private currencyPipe: CurrencyPipe,
              private userSesionservice: UsuarioSesionService) {
  }

  public nameMonth(key: string) {
    let names = [];
    for (let month of nameMonth) {
      names.push(month[key]);
    }
    return names;
  }
  public nameDay(key: string) {
    let names = [];
    for (let day of dayName) {
      names.push(day[key]);
    }
    return names;
  }
  public async crearLoading(msj: string = '') {
    const loading = await this.loadCtrl.create({
      message: msj
    });
    return await loading.present();
  }
  public detenerLoading() {
    this.loadCtrl.dismiss();
  }
  public async msjToast(msj: string, titulo: string, error: boolean, detenerLoading = true) {
    if (detenerLoading) this.detenerLoading();
    const toast = await this.toastController.create({
      //header: titulo,
      message: msj,
      position: 'top',
      //color: (error) ? 'danger' : 'success',
      duration: (error) ? 4000 : 1500,
      mode: 'ios',
      cssClass: (error) ? 'toast-danger' : 'toast-success'
    });
    toast.present();
    if (error && titulo === "¡ Dispositivo desvinculado !") {
        setTimeout(() =>  {
            this.crearLoading('Cerrando sesión').then(() => {
                this.userSesionservice.closeSesion().subscribe(result => {
                    this.detenerLoading();
                    this.userSesionservice.logoutSesion();
                }, error => {
                    this.msjToastErrorInterno(error.message);
                });
            });
        }, 500);
    }

  }
  public async msjToastErrorInterno(msjError, detenerLoading = true) {
    console.log('Error interno', msjError);
    if (detenerLoading) this.detenerLoading();
    const toast = await this.toastController.create({
      header: errorInterno.titulo,
      message: errorInterno.msj,
      position: 'top',
      //color: 'warning',
      mode: 'ios',
      cssClass: 'toast-warning',
      buttons: [
        {
          role: 'cancel',
          icon: 'close-circle',
          handler: () => {
          }
        }
      ]
    });
    toast.present();
  }
  public valueNewPassword(value) {
    this.newPassword = value;
    console.log("value:= ", value);
    console.log("this.newPassword:= ", this.newPassword);
  }
  public validar_email(email ): boolean {
    return exprRegEmail.test(email);
  }
  public obtFechaActual() {
    //2020-01-31
    const today = new Date();
    /*console.log(today.getFullYear() + "-" + (today.getMonth() + 1 ) + "-" + today.getDate());
    console.log("Date.now()", Date.now());
    console.log("new Date()", new Date());
    console.log("new Date().toLocaleString()", new Date().toLocaleString());
    console.log("new Date().toLocaleTimeString()", new Date().toLocaleTimeString());
    console.log("new Date().toLocaleDateString()", new Date().toLocaleDateString());
    console.log("new Date().toISOString()", new Date().toISOString());
    console.log("new Date().toISOString().substr(0, 10)", new Date().toISOString().substr(0, 10));*/
    return today.getFullYear() + "-" + this.formatDateNumber(today.getMonth() + 1 ) + "-" + this.formatDateNumber(today.getDate());
    //return new Date().toISOString().substr(0, 10);
  }
  private formatDateNumber(date: number): string {
    return (date < 10) ? "0" + date : date.toString();
  }
  public regex_MaxLengthNumber(lenght) {
    return "([0-9]{1," + lenght + "})";
  }
  public hasError(control) {
    let error = '';
    if (control.hasError("required")) {
      error += "El campo es requerido.\n"
    }
    /*if (control.hasError("passwordNoVerify")) {
      error += "Contraseña incorrecta";
    }
    if (control.hasError("emailNoVerify")) {
      error += "No existe el correo";
    }*/
    if (control.hasError("codeNoVerify")) {
      error += "Codigo incorrecto";
    }
    if (control.hasError("NoConfirmNewPassword")) {
      error += "Las contraseñas no coinciden";
    }
    if (control.hasError("email")) {
      error += "Ingrese un email valido\n";
    }
    if (control.hasError("minlength")) {
      error += "Longitud mínima permitida de " + control.getError("minlength").requiredLength + " caracteres.\n"
    }
    if (control.hasError("maxlength")) {
      error += "Longitud máxima permitida de " + control.getError("maxlength").requiredLength + " caracteres.\n"
    }
    if (control.hasError("min")) {
      error += "Valor númerico mínimo " + control.getError("min").min + ".\n"
    }
    if (control.hasError("pattern")) {
      error += this.errorRegexPatern(control.getError("pattern").requiredPattern) + ".\n"
    }
    return error;
  }
  private errorRegexPatern(pattern) {
    let error = "";
    if (pattern == "^" + this.exprRegular_2Decimal + "$") {
      error = "Campo númerico de no más de 6 decimales.";
    } else {
      let p = pattern.split(",");
      error = "Longitud máxima permitida de " + p[1][0] + " caracteres";
    }
    return error;
  }
  public totalMonto1(monto1, totaldev1, totalgastos) {
    return (parseFloat(monto1) - (parseFloat(totaldev1) + parseFloat(totalgastos)));
  }
  public totalMonto5(monto5, totaldev5) {
    return (monto5 - totaldev5);
  }
  public valorFecha(fecha): string {
      return this.datePipe.transform(fecha, "dd MMMM yyyy");
  }
  public valorCantidad(cantidad): string {
      return this.currencyPipe.transform(cantidad, "$");
  }
  /*public prefersDark() {
    const preferers = window.matchMedia('(prefers-color-scheme: dark)');
    return preferers.matches;
  }*/
}
