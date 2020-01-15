import { Component, OnInit } from '@angular/core';
import {CajaService} from '../../Servicios/Caja/caja.service';
import {UsuarioService} from '../../Servicios/Usuario/usuario.service';
import {UtileriasService} from '../../Servicios/Utilerias/utilerias.service';
import {AlertController, ModalController} from '@ionic/angular';
import {ModalCajaPage} from './ModalCaja/modal-caja.page';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.page.html',
  styleUrls: ['./caja.page.scss'],
})
export class CajaPage implements OnInit {

  constructor(private usuarioService: UsuarioService,
              public cajaService: CajaService,
              public util: UtileriasService,
              private modalController: ModalController,
              private alertController: AlertController) {
    this.verificarCajaAbierta();
  }

  ngOnInit() {
  }

  private async verificarCajaAbierta() {
    await this.util.crearLoading("Cargando caja abierta").then(() => {
      this.cajaService.obtenerCajaAbierta(this.usuarioService.usuarioSession.usuario.id.toString(), this.usuarioService.usuarioSession.usuario.token).subscribe(result => {
        this.util.msjToast(result.msj, result.titulo, result.error);
        this.cajaService.msj = result.msj;
        this.cajaService.cajaAbierta.isOpen = !result.error;
        if (result.error) {
          // No hay caja abierta => abrir modal
          this.abrirModal();
        } else {
         // Guardar en Starorage
         // this.cajaService.cajaAbierta.isOpen = true;
         this.cajaService.cajaAbierta.cajaOpen = result.caja;
         this.cajaService.actualizarCajaAbiertaStorage();
        }
      }, error => {
        this.util.msjToastErrorInterno(error.message);
      });
    });
  }

  public async abrirModal(opcion: string = this.util.operacion.AGREGAR) {
    const modal = await this.modalController.create({
      component: ModalCajaPage,
      componentProps: {
        'opcion': opcion
      }
    });
    return await modal.present();
  }

  public recargarDatosCajaAbierta(event) {
    this.verificarCajaAbierta().then(() => {
      event.target.complete();
    });
  }

  public cerrarCaja() {
    let total1 = this.util.totalMonto1(this.cajaService.cajaAbierta.cajaOpen.monto1, this.cajaService.cajaAbierta.cajaOpen.totaldevolucion1, this.cajaService.cajaAbierta.cajaOpen.totalgastos);
    let total5 = this.util.totalMonto5(this.cajaService.cajaAbierta.cajaOpen.monto5, this.cajaService.cajaAbierta.cajaOpen.totaldevolucion5);
    console.log(total1);
    console.log(total5);
    let suma = total5 + total1;
    if (suma == 0) {
      this.cerrarCajaActual(this.util.obtFechaActual());
    } else {
      let msj = '';
      msj = (total5 != 0) ? 'Aun quedan $' + total5 + '.00 en monedas de $5.00' : '';
      msj = (total1 != 0) ? msj + ' y $' + total1 + '.00 en monedas de $1.00' : msj + '';
      this.confirmCerrarCaja(msj);
      //this.util.msjToast(msj, '¡ Caja abierta !', true, false);
    }
  }

  private async confirmCerrarCaja(msj: string) {
    const alert = await this.alertController.create({
      header: "¡ Caja abierta !",
      message: "<h6 style='color: red;'>" + msj + "</h6><br><h6 style='color: red;'><strong>¿ Estas seguro de proceder ?</strong></h6>",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Si quiero',
          cssClass: 'primary',
          handler: () => {
            this.cerrarCajaActual(this.util.obtFechaActual());
          }
        }
      ]
    })
    await alert.present();
  }

  private async cerrarCajaActual(fechaCierre, nota = "") {
    const alert  = await this.alertController.create({
      header: `Corte a caja núm: ${this.cajaService.cajaAbierta.cajaOpen.id}`,
      backdropDismiss: false,
      inputs: [
        {
          name: 'nota',
          label: 'Nota',
          type: 'text',
          placeholder: 'Nota',
          value: nota,
        },
        {
          name: 'fechaCorte',
          label: 'Fecha de Corte',
          type: 'date',
          placeholder: 'Fecha de corte',
          min: '2000-03-01',
          value: fechaCierre,
          max: '2200-01-12'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Cerrar caja',
          cssClass: "danger",
          handler: (data) => {
            if (data.fechaCorte == "") {
              this.util.msjToast("Porfavor especifique una fecha de corte correcta para el cierre de la caja abierta.", "¡ Error de validación !", true);
              return false;
            } else {
              this.util.crearLoading("Cerrando la caja actual. ¡ Porfavor espere !").then(() => {
                this.cajaService.cerrarCaja(this.usuarioService.usuarioSession.usuario.id.toString(),
                    this.usuarioService.usuarioSession.usuario.token,
                    this.cajaService.cajaAbierta.cajaOpen.id.toString(),
                    data).subscribe(result => {
                      this.cajaService.msj = result.msj;
                      this.util.msjToast(result.msj, result.titulo, result.error);
                      if (!result.error) {
                        // ActualizarStorage
                        this.cajaService.cajaAbierta.isOpen = false;
                        this.cajaService.cajaAbierta.cajaOpen = null;
                        throw this.cajaService.actualizarCajaAbiertaStorage().then(() => {
                          this.abrirModal(this.util.operacion.AGREGAR);
                        });
                      } else {
                        this.cerrarCajaActual(data.fechaCorte, data.nota);
                      }
                      return !result.error;
                }, error => {
                      this.util.msjToastErrorInterno(error.message);
                      this.cerrarCajaActual(data.fechaCorte);
                      return false;
                });
              });
            }
          }
        }
      ]
    });
    await alert.present();
  }

}
