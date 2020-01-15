import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {CajaService} from '../../Servicios/Caja/caja.service';
import {UtileriasService} from '../../Servicios/Utilerias/utilerias.service';
import {UsuarioService} from '../../Servicios/Usuario/usuario.service';
import {VistaCajaClose} from '../../Modelos/Caja/Cerradas/vistaCajaClose';
import {AlertController} from '@ionic/angular';
/*import { File } from "@ionic-native/file/ngx";
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import { FileOpener } from "@ionic-native/file-opener/ngx";*/
import { URL } from '../../Servicios/Utilerias/app.config';
import { Plugins } from '@capacitor/core';


@Component({
  selector: 'app-cajas-cerradas',
  templateUrl: './cajas-cerradas.page.html',
  styleUrls: ['./cajas-cerradas.page.scss'],
})
export class CajasCerradasPage implements OnInit {

  public customAlertOptions: any = {
    header: 'Filtros',
    subHeader: 'Selecciona los filtros para la busqueda de cajas cerradas'
  };
  public alturaPagina = window.innerHeight - 117;
  @ViewChild("cntItemsBusqueda", {read: "", static: false}) cntItemsBusqueda = ElementRef;
  @ViewChildren('cntCajaCerrada') cntCajasCerradas = ElementRef;
  //fileTransfer: FileTransferObject;
  constructor(public cajaService: CajaService,
              public util: UtileriasService,
              private usuarioService: UsuarioService,
              private renderer2: Renderer2,
              private alertController: AlertController,
              /*private fileOpener: FileOpener,
              private transfer: FileTransfer,
              private file: File*/
) {
    this.cajaService.resetCajasCerradas();
    this.cajaService.dataFiltros.isCollapse = false;
    //this.cajaService.resetDataFiltrosBusqueda();
    this.cargarCajasCerradas();
  }

  ngOnInit() {
  }

  public itemsFiltrosSeleccionados() {
    for (let cnt in this.cajaService.dataFiltros.dataFiltros.value) {
      this.disabledControlForm(cnt, true);
    }
    for (let content of this.cajaService.dataFiltrosSelect) {
      this.disabledControlForm(content, false);
    }
    this.verificarDespliegueItemsSelectSearch()
  }

  public verificarDespliegueItemsSelectSearch(bnd: boolean = false) {
    let cantidadFiltros = this.cajaService.dataFiltrosSelect.length;
    if ( cantidadFiltros > 0) { //Desplegar
      const heigthIonItem = 75, heigthDiv = 240;
      let contadorDiv = 0, height = 0;
      for (let cnt of this.cajaService.dataFiltrosSelect) {
        if (cnt == "rangoFechaAbierto" || cnt == "rangoFechaCorte") {
          contadorDiv++;
        }
      }
      height = (contadorDiv * heigthDiv) + (heigthIonItem * (cantidadFiltros - contadorDiv)) + 132;
      height = (height > this.alturaPagina) ? this.alturaPagina : height ;
      if (bnd) {
        if (!this.cajaService.dataFiltros.isCollapse) {
          this.expandir(height, 13, this.cntItemsBusqueda['el']);
        } else {
          this.minimizar(this.cntItemsBusqueda['el']);
        }
        this.cajaService.dataFiltros.isCollapse = !this.cajaService.dataFiltros.isCollapse;
      } else {
        this.cajaService.dataFiltros.isCollapse = true;
        this.expandir(height, 13, this.cntItemsBusqueda['el']);
      }
    } else {//Minimizar
      this.cajaService.dataFiltros.isCollapse = false;
      this.minimizar(this.cntItemsBusqueda['el']);
    }

  }

  public verificarDespliegueContentCajaClose(index) {
    if (this.cajaService.cajasCerradas[index].cntAbierto == 0) {
      this.expandir(450, 13, this.cntCajasCerradas['_results'][index].el);
      this.cajaService.cajasCerradas[index].cntAbierto = 1;
    } else {
      this.minimizar(this.cntCajasCerradas['_results'][index].el);
      this.cajaService.cajasCerradas[index].cntAbierto = 0;
    }
  }

  private disabledControlForm(control, bnd) {
    if (bnd) {
      this.cajaService.dataFiltros.dataFiltros.get(control).disable();
    } else {
      this.cajaService.dataFiltros.dataFiltros.get(control).enable();

    }
  }

  public getStatusEnabled(nameControl: string) {
    return this.cajaService.dataFiltros.dataFiltros.get(nameControl).enabled;
  }

  public buscarCajasCerradas() {
    this.cajaService.dataFiltros.isSearch = true;
    this.cajaService.resetCajasCerradas();
    this.cargarCajasCerradas();
  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.cajaService.dataFiltros.dataFiltros.get(controlName);
    if (control.touched && control.errors != null && control.invalid) {
      error = this.util.hasError(control);
    }
    return error;
  }

  public recargarCajasCerradas(event) {
    this.cajaService.resetCajasCerradas();
    this.cajaService.resetDataFiltrosBusqueda();
    this.cargarCajasCerradas().then(() => {
      event.target.complete();
    });
  }

  public cargarDatosInifiniteScroll(event) {
    this.cargarCajasCerradas().then(() => {
      event.target.complete();
    });
  }

  public async cargarCajasCerradas() {
    if (this.cajaService.pagina == 0) {
      await this.util.crearLoading(((this.cajaService.dataFiltros.isSearch) ? "Buscando" : "Cargando") + " cajas cerradas. ¡ Porfavor espere !").then(() => {
        this.cajaService.obtenerCajasCerradas(this.usuarioService.usuarioSession.usuario.id.toString(),
            this.usuarioService.usuarioSession.usuario.token).subscribe(result => {
              this.resultado(result);
        }, error => {
              this.cajaService.msj = this.util.errorInterno.msj;
              this.util.msjToastErrorInterno(error.message);
        });
      });
    } else {
      await this.cajaService.obtenerCajasCerradas(this.usuarioService.usuarioSession.usuario.id.toString(),
          this.usuarioService.usuarioSession.usuario.token).subscribe(result => {
            this.resultado(result);
      }, error => {
        this.cajaService.msj = this.util.errorInterno.msj;
        this.util.msjToastErrorInterno(error.message);
      });
    }
  }

  private resultado(result) {
    if (this.cajaService.pagina == 0) {
      this.cajaService.msj = result.msj;
      this.util.msjToast(result.msj, result.titulo, result.error);
    }
    if (!result.error) {
      if (this.cajaService.pagina == 0 && this.cajaService.dataFiltros.isSearch) this.verificarDespliegueItemsSelectSearch(true);
      this.cajaService.pagina += 1;
      this.cajaService.cajasCerradas = this.cajaService.cajasCerradas.concat(result.cajasCerradas);
    }
  }

  public minimizar(content: any) {
    console.log("Minimizando");
    this.renderer2.setStyle(content,"transition","height 500ms, padding 500ms");
    this.renderer2.setStyle(content,"height","0px");
    this.renderer2.setStyle(content,"padding","0px 16px");
    this.renderer2.setStyle(content,"overflow","hidden");
  }

  public expandir(H, P, content: any) {
    console.log("MAximizando");
    this.renderer2.setStyle(content,"transition","height 500ms, padding 500ms");
    this.renderer2.setStyle(content,"height",H + "px");
    this.renderer2.setStyle(content,"padding",P + "px" + " 16px");

  }

  public async verCajaCerradas(cajaClose: VistaCajaClose) {
      const alert = await this.alertController.create({
          header: 'Detalle caja cerrada',
          message:
              "<h5 class='ion-text-center'><strong>Caja: " + cajaClose.id + "</strong></strong></h5>" +
              "<h6 class='ion-text-center'><strong>Fecha abierto: </strong>" + this.util.valorFecha(cajaClose.fechaAbierto) + "</h6>" +
              "<h6 class='ion-text-center'><strong>Fecha corte: </strong>" + this.util.valorFecha(cajaClose.fechaCorte) + "</h6>" +
              "<h6 class='ion-text-center'><strong>Nota de corte: </strong>" + ((cajaClose.nota == null) ? '' : cajaClose.nota) + "</h6>" +
              "<h6 class='ion-text-center'><strong>Monto inicial $1.00: </strong>" + this.util.valorCantidad(cajaClose.monto1)+ "</h6>" +
              "<h6 class='ion-text-center'><strong>Monto inicial $5.00: </strong>" + this.util.valorCantidad(cajaClose.monto5) + "</h6>",
          buttons: [
              {
                  text: 'Cerrar',
                  cssClass: 'primary'
              }
          ]
      });
      await alert.present();
  }

  public  generarReporte(idCaja: number, typeReport: number) {
    this.util.crearLoading('Generando reporte PDF para el monto de $' + typeReport + '.00').then(() => {
      this.cajaService.generarReport(this.usuarioService.usuarioSession.usuario.id.toString(),
          this.usuarioService.usuarioSession.usuario.token,
          idCaja, typeReport).subscribe(result => {
            this.util.detenerLoading();
            console.log(result);
          const { Browser } = Plugins;

          Browser.open({ url: URL + "report/" + result.namePDF });
            //this.download(URL + "report/" + result.namePDF, result.name);
      }, error => {
        this.util.msjToastErrorInterno(error.message);
      });
    });
  }

  /*public download(url: string, title: string) {
    this.fileTransfer = this.transfer.create();
    this.fileTransfer
        .download(url, this.file.dataDirectory + title + ".pdf")
        .then(entry => {
          console.log("download complete: " + entry.toURL());
          this.fileOpener
              .open(entry.toURL(), "application/pdf")
              .then(() => console.log("File is opened"))
              .catch(e => console.log("Error opening file", e));
        });
  }*/

}
