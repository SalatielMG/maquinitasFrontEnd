import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CajasCerradasPageRoutingModule } from './cajas-cerradas-routing.module';

import { CajasCerradasPage } from './cajas-cerradas.page';
/*import { FileOpener } from "@ionic-native/file-opener/ngx";
import { File } from "@ionic-native/file/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";*/


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CajasCerradasPageRoutingModule
  ],
  declarations: [CajasCerradasPage],
  /*providers: [
    FileTransfer,
    FileOpener,
    File,
  ]*/

})
export class CajasCerradasPageModule {}
