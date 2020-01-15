import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { CajaPageRoutingModule } from './caja-routing.module';

import { CajaPage } from './caja.page';
import {ModalCajaPageModule} from './ModalCaja/modal-caja.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CajaPageRoutingModule,
    ModalCajaPageModule
  ],
  declarations: [CajaPage]
})
export class CajaPageModule {}
