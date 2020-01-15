import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDevolucionPage } from './modal-devolucion.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDevolucionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDevolucionPageRoutingModule {}
