import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalRestablecerContrasenaPage } from './modal-restablecer-contrasena.page';

const routes: Routes = [
  {
    path: '',
    component: ModalRestablecerContrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalRestablecerContrasenaPageRoutingModule {}
