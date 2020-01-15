import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {UsuarioService} from '../../../Servicios/Usuario/usuario.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtileriasService} from '../../../Servicios/Utilerias/utilerias.service';
import {ConfirmNewPasswordDirective} from '../../../Validaciones/ConfirmNewPassword/confirm-new-password.directive';

@Component({
  selector: 'app-modal-restablecer-contrasena',
  templateUrl: './modal-restablecer-contrasena.page.html',
  styleUrls: ['./modal-restablecer-contrasena.page.scss'],
})
export class ModalRestablecerContrasenaPage implements OnInit {

  @Input() email: string;
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

  public restablecerPassword() {
    this.util.crearLoading("Actualizando contraseña").then(() => {
      this.usuarioService.restablecerPassword(this.email, this.password.value.newPassword).subscribe(result => {
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
