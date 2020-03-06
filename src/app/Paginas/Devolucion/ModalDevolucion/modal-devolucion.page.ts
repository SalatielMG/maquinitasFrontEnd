import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DevolucionService } from '../../../Servicios/Devolucion/devolucion.service';
import { UtileriasService } from '../../../Servicios/Utilerias/utilerias.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Devolucion } from '../../../Modelos/Devolucion/devolucion';
import { UsuarioService } from '../../../Servicios/Usuario/usuario.service';
import { CajaService } from '../../../Servicios/Caja/caja.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-devolucion',
  templateUrl: './modal-devolucion.page.html',
  styleUrls: ['./modal-devolucion.page.scss'],
})
export class ModalDevolucionPage implements OnInit {

  public opcion: string;
  public Devolucion: FormGroup = null;
  @ViewChild("cntCajaActual") cntCajaActual = ElementRef;

  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private usuarioService: UsuarioService,
              public devolucionService: DevolucionService,
              public util: UtileriasService,
              public cajaService: CajaService,
              private formBuilder: FormBuilder,
              private router: Router,
              private renderer2: Renderer2) {
    this.opcion = navParams.get('opcion');
    this.cajaService.cajaAbierta.cajaOpen.corte = 0;
    this.construirFormulario(navParams.get('devolucion'));
  }

  ngOnInit() {
  }

  public cerrarModal() {
    this.modalController.dismiss();
  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.Devolucion.get(controlName);
    if (control.touched && control.errors != null && control.invalid) {
      error = this.util.hasError(control);
    }
    return error;
  }

  public construirFormulario(devolucion: Devolucion) {
    this.Devolucion =  this.formBuilder.group({
      id: [devolucion.id],
      caja: [devolucion.caja],
      tipo: [devolucion.tipo],
      fecha: [devolucion.fecha, {
        validators: [Validators.required],
      }],
      cantidad: [devolucion.cantidad, {
        validators: [Validators.required, Validators.pattern(this.util.regex_MaxLengthNumber('11'))]
      }],
    });
  }

  public enviar() {
    switch (this.opcion) {
      case this.util.operacion.AGREGAR:
        this.agregarDevolucion();
        break;
      case this.util.operacion.ACTUALIZAR:
        this.actualizarDevolucion();
        break;
    }
  }

  private agregarDevolucion() {
    this.util.crearLoading("Agregando nueva devolución").then(() => {
      this.devolucionService.agregarDevolucion(this.usuarioService.usuarioSession.usuario.id.toString(), this.usuarioService.usuarioSession.usuario.token, this.Devolucion.value).
      subscribe(result => {
        this.util.msjToast(result.msj, result.titulo, result.error);
        this.devolucionService.msj = result.msj;
        if (!result.error) {
          // Agregar devolocuion a la ista de registros.
          if (this.Devolucion.value.tipo == 1) {
            this.devolucionService.Devoluciones1.push(result.devolucion.devoluciones[0]);
          } else {
            this.devolucionService.Devoluciones5.push(result.devolucion.devoluciones[0]);
          }
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
  private actualizarDevolucion() {
    this.util.crearLoading("Actualizando devolucion").then(() => {
      this.devolucionService.actualizarDevolucion(this.usuarioService.usuarioSession.usuario.id.toString(), this.usuarioService.usuarioSession.usuario.token, this.Devolucion.value).
      subscribe(result => {
        this.util.msjToast(result.msj, result.titulo, result.error);
        this.devolucionService.msj = result.msj;
        if (!result.error) {
          // Actualizar registro
          if (this.Devolucion.value.tipo == 1) {
            this.devolucionService.Devoluciones1[this.devolucionService.indexDevolucionSelected] = result.devolucion.devoluciones[0];
          } else {
            this.devolucionService.Devoluciones5[this.devolucionService.indexDevolucionSelected] = result.devolucion.devoluciones[0];
          }
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
      this.expandir((this.Devolucion.value.tipo == 1) ? 322: 274, 13, this.cntCajaActual['el']);
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
