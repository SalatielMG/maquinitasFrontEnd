import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { UsuarioService } from '../../../Servicios/Usuario/usuario.service';
import { GastoService } from '../../../Servicios/Gasto/gasto.service';
import { TiposGastosService } from '../../../Servicios/TiposGastos/tipos-gastos.service';
import { UtileriasService } from '../../../Servicios/Utilerias/utilerias.service';
import { CajaService } from '../../../Servicios/Caja/caja.service';
import { Router } from '@angular/router';
import { Gasto } from '../../../Modelos/Gasto/Gasto';

@Component({
  selector: 'app-modal-gasto',
  templateUrl: './modal-gasto.page.html',
  styleUrls: ['./modal-gasto.page.scss'],
})
export class ModalGastoPage implements OnInit {

  public opcion: string;
  public Gasto: FormGroup = null;
  @ViewChild("cntCajaActual", {static: false }) cntCajaActual = ElementRef;

  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private usuarioService: UsuarioService,
              public gastoService: GastoService,
              public tiposGastosService: TiposGastosService,
              public util: UtileriasService,
              public cajaService: CajaService,
              private formBuilder: FormBuilder,
              private router: Router,
              private renderer2: Renderer2) {
    this.opcion = navParams.get('opcion');
    this.cajaService.cajaAbierta.cajaOpen.corte = 0;
    this.construirFormulario(navParams.get('gasto'));
  }

  ngOnInit() {
  }

  public cerrarModal() {
    this.modalController.dismiss();
  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.Gasto.get(controlName);
    if (control.touched && control.errors != null && control.invalid) {
      error = this.util.hasError(control);
    }
    return error;
  }

  public construirFormulario(gasto: Gasto) {
    this.Gasto = this.formBuilder.group({
      id: [gasto.id],
      caja: [gasto.caja],
      fecha: [gasto.fecha, {
        validators: [Validators.required],
      }],
      tipo: [gasto.tipo, {
        validators: [Validators.required, Validators.min(1)],
      }],
      gasto: [gasto.gasto, {
        validators: [Validators.required, Validators.pattern(this.util.exprRegular_2Decimal)]
      }],
      descripcion: [gasto.descripcion, {
        validators: [Validators.maxLength(100)]
      }],
    });
  }

  public enviar() {
    switch (this.opcion) {
      case this.util.operacion.AGREGAR:
        this.agregarGasto();
        break;
      case this.util.operacion.ACTUALIZAR:
        this.actualizarGasto();
        break;
    }
  }

  private agregarGasto() {
    this.util.crearLoading("Agregando nuevo gasto").then(() => {
      this.gastoService.agregarGasto(this.usuarioService.usuarioSession.usuario.id.toString(),
          this.usuarioService.usuarioSession.usuario.token,
          this.Gasto.value).subscribe(result => {
        this.util.msjToast(result.msj, result.titulo, result.error);
        this.gastoService.msj = result.msj;
        if (!result.error) {
          this.gastoService.Gastos.push(result.gasto.gastos[0]);
          this.cajaService.msj = result.caja.msj;
          this.cajaService.cajaAbierta.isOpen = !result.caja.error;
          if (!result.caja.error) {
            this.cajaService.cajaAbierta.cajaOpen = result.caja.caja;
            this.cajaService.actualizarCajaAbiertaStorage();
          } else {
            this.util.msjToast(result.caja.msj, result.caja.titulo, result.caja.error).then(() => {
              this.router.navigate(['/caja']);
            });
          }
          this.cerrarModal();
        }
      }, error => {
        this.util.msjToastErrorInterno(error.message);
      });
    });
  }

  private actualizarGasto() {
    this.util.crearLoading("Actualizando gasto").then(() => {
      this.gastoService.actualizarGasto(this.usuarioService.usuarioSession.usuario.id.toString(),
          this.usuarioService.usuarioSession.usuario.token,
          this.Gasto.value).subscribe(result => {
        this.util.msjToast(result.msj, result.titulo, result.error);
        this.gastoService.msj = result.msj;
        if (!result.error) {
          this.gastoService.Gastos[this.gastoService.indexGastoSelected] = result.gasto.gastos[0];
          // Actualizar Caja abierta Storage.
          this.cajaService.msj = result.caja.msj;
          this.cajaService.cajaAbierta.isOpen = !result.caja.error;
          if (!result.caja.error) {
            this.cajaService.cajaAbierta.cajaOpen = result.caja.caja;
            this.cajaService.actualizarCajaAbiertaStorage();
          } else {
            this.util.msjToast(result.caja.msj, result.caja.titulo, result.caja.error).then(() => {
              this.router.navigate(['/caja']);
            });
          }
          this.cerrarModal();
        }
      }, error => {
        this.util.msjToastErrorInterno(error.message);
      });
    });
  }

  public verificarDespliegue() {
    console.log(this.cntCajaActual['el']);
    if (this.cajaService.cajaAbierta.cajaOpen.corte == 0) { //Desplegar
      this.expandir( 322, 13, this.cntCajaActual['el']);
      this.cajaService.cajaAbierta.cajaOpen.corte = 1;
    } else { // Minimizar
      this.minimizar(this.cntCajaActual['el']);
      this.cajaService.cajaAbierta.cajaOpen.corte = 0;
    }
  }

  public minimizar(content: any){
    this.renderer2.setStyle(content,"transition","height 500ms, padding 500ms");
    this.renderer2.setStyle(content,"height","0");
    this.renderer2.setStyle(content,"padding","0 16px");
    this.renderer2.setStyle(content,"overflow","hidden");
  }

  public expandir(H, P, content: any){
    this.renderer2.setStyle(content,"transition","height 500ms, padding 500ms");
    this.renderer2.setStyle(content,"height",H + "px");
    this.renderer2.setStyle(content,"padding",P + "px" + " 16px");
  }

}
