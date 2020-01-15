import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCajaPageRoutingModule } from './modal-caja-routing.module';

import { ModalCajaPage } from './modal-caja.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ModalCajaPageRoutingModule
  ],
  declarations: [ModalCajaPage]
})
export class ModalCajaPageModule {}
