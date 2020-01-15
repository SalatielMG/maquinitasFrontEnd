import { Component, OnInit } from '@angular/core';
import {UtileriasService} from '../../Servicios/Utilerias/utilerias.service';
import {GastoService} from '../../Servicios/Gasto/gasto.service';
import {CajaService} from '../../Servicios/Caja/caja.service';
import {UsuarioService} from '../../Servicios/Usuario/usuario.service';
import {AlertController, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Gasto} from '../../Modelos/Gasto/Gasto';
import {ModalGastoPage} from './ModalGasto/modal-gasto.page';

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.page.html',
  styleUrls: ['./gasto.page.scss'],
})
export class GastoPage implements OnInit {

  constructor(public util: UtileriasService,
              public gastoService: GastoService,
              private usuarioService: UsuarioService,
              private cajaService: CajaService,
              private alertController: AlertController,
              private modalController: ModalController,
              private router: Router) {
    this.cargarGastos();
  }

  ngOnInit() {
  }

  public async cargarGastos() {
    this.gastoService.resetGastos();
    await this.util.crearLoading("Cargando gastos sobre el monto de $1.00 ¡ Porfavor espere !").then(() => {
      this.gastoService.cargarGastos(this.usuarioService.usuarioSession.usuario.id.toString(),
          this.usuarioService.usuarioSession.usuario.token).
          subscribe(result => {
            this.util.msjToast(result.msj, result.titulo, result.error);
            this.gastoService.msj = result.msj;
            if (!result.error) {
              this.gastoService.Gastos = result.gastos;
            }
      }, error => {
            this.gastoService.msj = this.util.errorInterno.msj;
            this.util.msjToastErrorInterno(error.message);
      });
    });
  }

  public recargarGastos(event) {
    this.cargarGastos().then(() => {
      event.target.complete();
    });
  }

  public async verGasto(gasto: Gasto) {
    const alert = await this.alertController.create({
      header: 'Detalle Gasto',
      message:
          "<br><h6 class='ion-text-center'><strong>Fecha: </strong>" + this.util.valorFecha(gasto.fecha) + "</h6>" +
          "<h6 class='ion-text-center'><strong>Tipo de gasto: </strong>" + gasto.nombre+ "</h6>" +
          "<h6 class='ion-text-center'><strong>Gasto: </strong>" + this.util.valorCantidad(gasto.gasto) + "</h6>" +
          "<h6 class='ion-text-center'><strong>Descripción: </strong>" + gasto.descripcion + "</h6>",
      buttons: [
        {
          text: "Cerrar",
          cssClass: "primary"
        }]
    });
    await alert.present();
  }
  public async eliminarGasto(gasto: Gasto, index) {
    const alert = await this.alertController.create({
      header: 'Eliminar gasto',
      message: "¿ Estas seguro de eliminar el siguiente gasto ?" +
          "<br><br><h6 class='ion-text-center'><strong>Fecha: </strong>" + this.util.valorFecha(gasto.fecha) + "</h6>" +
          "<h6 class='ion-text-center'><strong>Tipo de gasto: </strong>" + gasto.nombre+ "</h6>" +
          "<h6 class='ion-text-center'><strong>Gasto: </strong>" + this.util.valorCantidad(gasto.gasto) + "</h6>" +
          "<h6 class='ion-text-center'><strong>Descripción: </strong>" + gasto.descripcion + "</h6>",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {}
        },
        {
          text: "Eliminar",
          role: "ok",
          cssClass: "danger",
          handler: () => {
            this.util.crearLoading("Eliminando el gasto seleccionado. ¡ Porfavor espere !").then(() => {
              this.gastoService.eliminarGasto(this.usuarioService.usuarioSession.usuario.id.toString(),
                  this.usuarioService.usuarioSession.usuario.token,
                  gasto.id).subscribe(result => {
                    this.util.msjToast(result.msj, result.titulo, result.error);
                    this.gastoService.msj = result.msj;
                    if (!result.error) {
                      this.gastoService.Gastos.splice(index, 1);
                      // Actualizar Caja abierta Stoorage.
                      this.cajaService.msj = result.caja.msj;
                      this.cajaService.cajaAbierta.isOpen = !result.caja.error;
                      if (!result.caja.error) {
                        this.cajaService.cajaAbierta.cajaOpen = result.caja.caja;
                        this.cajaService.actualizarCajaAbiertaStorage();
                      } else {
                        //Retornar a la vista de caja abierta.
                        this.util.msjToast(result.caja.msj, result.caja.titulo, result.error).then(() => {
                          this.router.navigate(['/caja']);
                        });
                      }
                    }
              }, error => {
                    this.util.msjToastErrorInterno(error.message);
              });
            });
          }
        }
      ],
    });
    await alert.present();
  }


  public async abrirModal(opcion: string = this.util.operacion.AGREGAR, gasto = new Gasto(), index: number = 0) {
    if (opcion == this.util.operacion.AGREGAR) {
      gasto.caja = this.cajaService.cajaAbierta.cajaOpen.id;
      gasto.fecha = this.util.obtFechaActual();
    } else {
      this.gastoService.indexGastoSelected = index;
    }
    const modal = await this.modalController.create({
      component: ModalGastoPage,
      componentProps:  {
        'opcion': opcion,
        'gasto': gasto
      }
    });
    return await modal.present();
  }

}
