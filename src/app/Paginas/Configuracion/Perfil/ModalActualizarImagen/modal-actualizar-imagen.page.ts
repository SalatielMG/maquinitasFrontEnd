import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {UsuarioService} from '../../../../Servicios/Usuario/usuario.service';
import {UtileriasService} from '../../../../Servicios/Utilerias/utilerias.service';

@Component({
  selector: 'app-modal-actualizar-imagen',
  templateUrl: './modal-actualizar-imagen.page.html',
  styleUrls: ['./modal-actualizar-imagen.page.scss'],
})
export class ModalActualizarImagenPage implements OnInit {

  public photo: SafeResourceUrl;

  constructor(private modalController: ModalController,
              private sanitizer: DomSanitizer,
              private usuarioService: UsuarioService,
              private util: UtileriasService) {
    this.takePicture();
  }

  ngOnInit() {
  }

  public async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && image.dataUrl);
  }

  public cerrarModal() {
    this.modalController.dismiss();
  }

  public subirFoto() {
    if (this.photo == undefined) {
      this.util.msjToast("Porfavor elige o toma la foto de perfil para subir al servidor", "", true);
      return;
    }
    console.log(this.photo);
    this.util.crearLoading("Subiendo foto de perfil").then(() => {
      this.usuarioService.actualizarImagenPerfil(this.photo).subscribe(result => {
        this.util.msjToast(result.msj, result.titulo, result.error);
        if (!result.error) {
          this.usuarioService.usuarioSession.usuario.imagen = result.nameImagen;
          this.usuarioService.actualizarUsuarioSessionStorage().then(() => {
            this.cerrarModal();
          });
        }
      }, error => {
        this.util.msjToastErrorInterno(error.message);
      });
    });
    console.log(this.photo);
  }

}
