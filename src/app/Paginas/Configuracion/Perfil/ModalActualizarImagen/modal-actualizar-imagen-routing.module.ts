import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalActualizarImagenPage } from './modal-actualizar-imagen.page';

const routes: Routes = [
  {
    path: '',
    component: ModalActualizarImagenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalActualizarImagenPageRoutingModule {}
