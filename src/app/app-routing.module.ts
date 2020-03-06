import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IsSessionActiveGuard } from './Validaciones/Guards/isSessionActive/is-session-active.guard';
import {IsCajaOpenGuard} from './Validaciones/Guards/isCajaOpen/is-caja-open.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./Paginas/Login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    canActivate: [IsSessionActiveGuard],
    loadChildren: () => import('./Paginas/Home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'caja',
    canActivate: [IsSessionActiveGuard],
    loadChildren: () => import('./Paginas/Caja/caja.module').then(m => m.CajaPageModule)
  },
  {
    path: 'devolucion',
    canActivate: [IsSessionActiveGuard, IsCajaOpenGuard],
    loadChildren: () => import('./Paginas/Devolucion/devolucion.module').then(m => m.DevolucionPageModule)
  },
  {
    path: 'gasto',
    canActivate: [IsSessionActiveGuard, IsCajaOpenGuard],
    loadChildren: () => import('./Paginas/Gasto/gasto.module').then(m => m.GastoPageModule)
  },
  {
    path: 'cajasCerradas',
    canActivate: [IsSessionActiveGuard],
    loadChildren: () => import('./Paginas/CajasCerradas/cajas-cerradas.module').then(m => m.CajasCerradasPageModule)
  },
  {
    path: 'configuracion',
    canActivate: [IsSessionActiveGuard],
    loadChildren: () => import('./Paginas/Configuracion/configuracion.module').then(m => m.ConfiguracionPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
