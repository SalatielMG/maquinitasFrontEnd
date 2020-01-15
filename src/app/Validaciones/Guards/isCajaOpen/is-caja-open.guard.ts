import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CajaService } from '../../../Servicios/Caja/caja.service';
import { UtileriasService } from '../../../Servicios/Utilerias/utilerias.service';

@Injectable({
  providedIn: 'root'
})
export class IsCajaOpenGuard implements CanActivate {

  constructor(private cajaService: CajaService, private util: UtileriasService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.cajaService.isCajaAbierta()) return true;
    this.util.msjToast("No puede elegir esta opcion del menu porque no hay ninguna caja abierta", "¡ Error - Caja no abierta !", true, false);
    return false;
  }
}
