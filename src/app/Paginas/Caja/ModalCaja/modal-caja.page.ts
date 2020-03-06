import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import { CajaService } from '../../../Servicios/Caja/caja.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UtileriasService } from '../../../Servicios/Utilerias/utilerias.service';
import {Caja} from '../../../Modelos/Caja/caja';
import {UsuarioService} from '../../../Servicios/Usuario/usuario.service';

@Component({
  selector: 'app-modal-caja',
  templateUrl: './modal-caja.page.html',
  styleUrls: ['./modal-caja.page.scss'],
})
export class ModalCajaPage implements OnInit {

  public opcion: string;
  public Caja: FormGroup = null;

  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private usuarioService: UsuarioService,
              public cajaService: CajaService,
              private formBuilder: FormBuilder,
              public util: UtileriasService) {
    this.opcion = navParams.get('opcion');
    switch (this.opcion) {
      case util.operacion.AGREGAR:
        this.construirFormulario();
        break;
      case util.operacion.ACTUALIZAR:
        this.construirFormulario(cajaService.cajaAbierta.cajaOpen);
        break;
    }
  }

  ngOnInit() {
  }

  public cerrarModal() {
    this.modalController.dismiss();
  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.Caja.get(controlName);
    if (control.touched && control.errors != null && control.invalid) {
      error = this.util.hasError(control);
    }
    return error;
  }

  public construirFormulario(caja = new Caja()) {
    this.Caja = this.formBuilder.group({
      id: [caja.id],
      fechaAbierto: [(this.opcion == this.util.operacion.AGREGAR) ? this.util.obtFechaActual() : caja.fechaAbierto, Validators.required],
      monto1: [caja.monto1, {
        validators: [Validators.required, Validators.pattern(this.util.regex_MaxLengthNumber('11'))]
      }],
      monto5: [caja.monto5, {
        validators: [Validators.required, Validators.pattern(this.util.regex_MaxLengthNumber('11'))]
      }],
    });
  }

  public enviarDatos() {
    switch (this.opcion) {
      case this.util.operacion.AGREGAR:
        this.agregarCaja();
        break;
      case this.util.operacion.ACTUALIZAR:
        this.actualizarCaja();
        break;
    }
    console.log(this.Caja.value);
  }

  private agregarCaja() {
    this.util.crearLoading("Agregando nueva caja").then(() => {
      this.cajaService.agregarCaja(this.usuarioService.usuarioSession.usuario.id.toString(), this.usuarioService.usuarioSession.usuario.token, this.Caja.value).subscribe( result => {
        this.util.msjToast(result.msj, result.titulo, result.error);
        this.cajaService.cajaAbierta.isOpen = !result.error;
        if (!result.error) {
          this.cajaService.cajaAbierta.isOpen = !result.caja.error;
          if (!result.caja.error) {
            this.cajaService.cajaAbierta.cajaOpen = result.caja.caja;
            this.cajaService.actualizarCajaAbiertaStorage();
          } else {
            this.util.msjToast(result.caja.msj + ". Porfavor recargue la pagina", result.caja.titulo, result.error);
          }
          this.cerrarModal();
        }
      }, error => {
        this.util.msjToastErrorInterno(error.message);
      });
    });
  }
  private actualizarCaja() {
    this.util.crearLoading("Actualizando caja " + this.cajaService.cajaAbierta.cajaOpen.id).then(() => {
      this.cajaService.actualizarCaja(this.usuarioService.usuarioSession.usuario.id.toString(), this.usuarioService.usuarioSession.usuario.token, this.Caja.value).subscribe( result => {
        this.util.msjToast(result.msj, result.titulo, result.error);
        this.cajaService.cajaAbierta.isOpen = !result.error;
        if (!result.error) {
          this.cajaService.cajaAbierta.isOpen = !result.caja.error;
          if (!result.caja.error) {
            this.cajaService.cajaAbierta.cajaOpen = result.caja.caja;
            this.cajaService.actualizarCajaAbiertaStorage();
          } else {
            this.util.msjToast(result.caja.msj + ". Porfavor recargue la pagina", result.caja.titulo, result.error);
          }
          this.cerrarModal();
        }
      }, error => {
        this.util.msjToastErrorInterno(error.message);
      });
    });
  }

}
