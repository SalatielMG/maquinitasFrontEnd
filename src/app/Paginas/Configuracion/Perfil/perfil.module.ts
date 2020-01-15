import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';
import { ModalActualizarPerfilPageModule } from './ModalActualizarContraseña/modal-actualizar-contraseña.module';
import {ModalActualizarImagenPageModule} from './ModalActualizarImagen/modal-actualizar-imagen.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
    ModalActualizarPerfilPageModule,
    ModalActualizarImagenPageModule
  ],
  declarations: [PerfilPage]
})
export class PerfilPageModule {}
