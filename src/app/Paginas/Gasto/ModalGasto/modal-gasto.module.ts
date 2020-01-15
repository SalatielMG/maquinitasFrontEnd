import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalGastoPageRoutingModule } from './modal-gasto-routing.module';

import { ModalGastoPage } from './modal-gasto.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ModalGastoPageRoutingModule
  ],
  declarations: [ModalGastoPage]
})
export class ModalGastoPageModule {}
