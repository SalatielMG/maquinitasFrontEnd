import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GastoPageRoutingModule } from './gasto-routing.module';

import { GastoPage } from './gasto.page';
import {ModalGastoPageModule} from './ModalGasto/modal-gasto.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GastoPageRoutingModule,
    ModalGastoPageModule
  ],
  declarations: [GastoPage]
})
export class GastoPageModule {}
