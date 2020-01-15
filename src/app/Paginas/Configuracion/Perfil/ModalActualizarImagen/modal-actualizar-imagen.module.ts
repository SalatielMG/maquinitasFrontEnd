import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalActualizarImagenPageRoutingModule } from './modal-actualizar-imagen-routing.module';

import { ModalActualizarImagenPage } from './modal-actualizar-imagen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalActualizarImagenPageRoutingModule
  ],
  declarations: [ModalActualizarImagenPage]
})
export class ModalActualizarImagenPageModule {}
