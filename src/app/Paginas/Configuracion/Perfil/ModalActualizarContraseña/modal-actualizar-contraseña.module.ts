import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalActualizarPerfilPageRoutingModule } from './modal-actualizar-contraseña-routing.module';

import { ModalActualizarContraseAPage } from './modal-actualizar-contraseña.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ModalActualizarPerfilPageRoutingModule
  ],
  declarations: [ModalActualizarContraseAPage]
})
export class ModalActualizarPerfilPageModule {}
