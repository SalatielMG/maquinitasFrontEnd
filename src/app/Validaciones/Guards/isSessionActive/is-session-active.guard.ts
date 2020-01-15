import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../../Servicios/Usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class IsSessionActiveGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.usuarioService.sesionAbierta()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
