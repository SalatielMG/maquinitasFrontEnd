import { Component, OnInit } from '@angular/core';
import {UtileriasService} from '../../Servicios/Utilerias/utilerias.service';
import {DevolucionService} from '../../Servicios/Devolucion/devolucion.service';
import {UsuarioService} from '../../Servicios/Usuario/usuario.service';
import {AlertController, ModalController} from '@ionic/angular';
import {Devolucion} from '../../Modelos/Devolucion/devolucion';
import {CajaService} from '../../Servicios/Caja/caja.service';
import {Router} from '@angular/router';
import {ModalDevolucionPage} from './ModalDevolucion/modal-devolucion.page';
import {Gasto} from '../../Modelos/Gasto/Gasto';

@Component({
  selector: 'app-devolucion',
  templateUrl: './devolucion.page.html',
  styleUrls: ['./devolucion.page.scss'],
})
export class DevolucionPage implements OnInit {

  public tipoDevolucion: number = 1;

  constructor(public util: UtileriasService,
              public devolucionService: DevolucionService,
              private usuarioService: UsuarioService,
              private cajaService: CajaService,
              private alertController: AlertController,
              private modalController: ModalController,
              private router: Router) {
    this.cargarDevoluciones();
  }

  ngOnInit() {
  }

  public async cargarDevoluciones() {
    this.devolucionService.resetDevoluciones(this.tipoDevolucion);
    await this.util.crearLoading("Cargando devoluciones de $" + this.tipoDevolucion + ".00 ¡ Porfavor espere !").then(() => {
      this.devolucionService.cargarDevoluciones(this.usuarioService.usuarioSession.usuario.id.toString(),
          this.usuarioService.usuarioSession.usuario.token,
          this.tipoDevolucion).
      subscribe(result => {
        this.util.msjToast(result.msj, result.titulo, result.error);
        this.devolucionService.msj = result.msj;
        if (!result.error) {
          if (this.tipoDevolucion == 1) {
            this.devolucionService.Devoluciones1 = result.devoluciones;
          } else {
            this.devolucionService.Devoluciones5 = result.devoluciones;
          }
        }
      }, error => {
        this.devolucionService.msj = this.util.errorInterno.msj;
        this.util.msjToastErrorInterno(error.message);
      })
    });
  }

  public recargarDevoluciones(event) {
    this.cargarDevoluciones().then(() => {
      event.target.complete();
    });
  }
  public async verDevolucion(devolucion: Devolucion) {
    const alert = await this.alertController.create({
      header: 'Detalle Gasto',
      message:
          "<br><h6 class='ion-text-center'><strong>Fecha devuelto: </strong>" + this.util.valorFecha(devolucion.fecha) + "</h6>" +
          "<h6 class='ion-text-center'><strong>Cantidad: </strong>" + this.util.valorCantidad(devolucion.cantidad) + "</h6>",

      buttons: [
        {
          text: "Cerrar",
          cssClass: "primary"
        }]
    });
    await alert.present();
  }
  public async eliminarDevolucion(devolucion: Devolucion, index) {
    const alert = await this.alertController.create({
      header: "Eliminar devolucion",
      message: "¿ Estas seguro de eliminar la siguiente devolucion ?" +
          "<br><br><h6 class='ion-text-center'><strong>Fecha devuelto: </strong>" + this.util.valorFecha(devolucion.fecha) + "</h6>" +
          "<h6 class='ion-text-center'><strong>Cantidad: </strong>" + this.util.valorCantidad(devolucion.cantidad) + "</h6>",

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
            this.util.crearLoading("Eliminando la devolución seleccionada. ¡ Porfavor espere !").then(() =>  {
              this.devolucionService.eliminarDevolucion(this.usuarioService.usuarioSession.usuario.id.toString(),
                  this.usuarioService.usuarioSession.usuario.token,
                  devolucion.id.toString(),
                  this.tipoDevolucion).
              subscribe( result => {
                this.util.msjToast(result.msj, result.titulo, result.error);
                this.devolucionService.msj = result.msj;
                if (!result.error) {
                  // Eliminar registro devolucion del arreglo
                  if (this.tipoDevolucion == 1) {
                    this.devolucionService.Devoluciones1.splice(index, 1);
                  } else {
                    this.devolucionService.Devoluciones5.splice(index, 1);
                  }
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

  public async abrirModal(opcion: string = this.util.operacion.AGREGAR, devolucion: Devolucion = new Devolucion(), index: number = 0) {
    if (opcion == this.util.operacion.AGREGAR) {
      devolucion.tipo = this.tipoDevolucion;
      devolucion.caja = this.cajaService.cajaAbierta.cajaOpen.id;
      devolucion.fecha = this.util.obtFechaActual();
    } else {
      this.devolucionService.indexDevolucionSelected = index;
    }
    const modal = await this.modalController.create({
      component: ModalDevolucionPage,
      componentProps: {
        'opcion': opcion,
        'devolucion': devolucion
      }
    });
    return await modal.present();
  }

}
