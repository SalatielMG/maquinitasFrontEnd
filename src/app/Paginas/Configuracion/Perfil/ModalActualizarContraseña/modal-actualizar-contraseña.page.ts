import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsuarioService} from '../../../../Servicios/Usuario/usuario.service';
import {ConfirmNewPasswordDirective} from '../../../../Validaciones/ConfirmNewPassword/confirm-new-password.directive';
import {UtileriasService} from '../../../../Servicios/Utilerias/utilerias.service';

@Component({
  selector: 'app-modal-actualizar-perfil',
  templateUrl: './modal-actualizar-contraseña.page.html',
  styleUrls: ['./modal-actualizar-contraseña.page.scss'],
})
export class ModalActualizarContraseAPage implements OnInit {
  public password: FormGroup = null;
  constructor(private modalController: ModalController,
              private usuarioService: UsuarioService,
              private formBuilder: FormBuilder,
              public util: UtileriasService,
              private confirmNewPasswordDirective: ConfirmNewPasswordDirective) {
    this.construirFormulario();
  }

  ngOnInit() {
  }

  public cerrarModal() {
    this.modalController.dismiss();
  }

  private construirFormulario() {
    this.password = this.formBuilder.group({
      newPassword: ['',
        {
          validators: [Validators.required, Validators.maxLength(10)]
        }
      ],
      confirmNewPassword: ['',
        {
          validators: [Validators.required, Validators.maxLength(10), this.confirmNewPasswordDirective.validate.bind(this.confirmNewPasswordDirective)]
        }
      ]
    });
  }

  public actualizarPassword() {
    this.util.crearLoading("Actualizando contraseña").then(() => {
      this.usuarioService.actualizarPassword(this.password.value.newPassword).subscribe(result => {
        this.util.msjToast(result.msj, result.titulo, result.error);
        if (!result.error) {
          this.cerrarModal();
        }
      }, error => {
        this.util.msjToastErrorInterno(error.message);
      });
    });
  }

}
