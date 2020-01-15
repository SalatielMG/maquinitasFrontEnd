import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalDevolucionPageRoutingModule } from './modal-devolucion-routing.module';

import { ModalDevolucionPage } from './modal-devolucion.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ModalDevolucionPageRoutingModule
  ],
  declarations: [ModalDevolucionPage]
})
export class ModalDevolucionPageModule {}
