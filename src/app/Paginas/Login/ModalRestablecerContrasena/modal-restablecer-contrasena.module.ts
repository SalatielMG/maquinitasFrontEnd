import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalRestablecerContrasenaPageRoutingModule } from './modal-restablecer-contrasena-routing.module';

import { ModalRestablecerContrasenaPage } from './modal-restablecer-contrasena.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ModalRestablecerContrasenaPageRoutingModule
  ],
  declarations: [ModalRestablecerContrasenaPage]
})
export class ModalRestablecerContrasenaPageModule {}
