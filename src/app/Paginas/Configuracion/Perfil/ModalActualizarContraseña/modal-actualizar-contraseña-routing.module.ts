import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalActualizarContraseAPage } from './modal-actualizar-contraseña.page';

const routes: Routes = [
  {
    path: '',
    component: ModalActualizarContraseAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalActualizarPerfilPageRoutingModule {}
