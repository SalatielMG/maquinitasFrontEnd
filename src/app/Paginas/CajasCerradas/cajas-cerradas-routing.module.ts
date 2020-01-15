import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CajasCerradasPage } from './cajas-cerradas.page';

const routes: Routes = [
  {
    path: '',
    component: CajasCerradasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CajasCerradasPageRoutingModule {}
