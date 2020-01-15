import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracionPage } from './configuracion.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionPage
  },
  {
    path: 'perfil',
    loadChildren: () => import('./Perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'acerca',
    loadChildren: () => import('./Acerca/acerca.module').then(m => m.AcercaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionPageRoutingModule {}
