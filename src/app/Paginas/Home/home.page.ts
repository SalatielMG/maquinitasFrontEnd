import { Component, OnInit } from '@angular/core';
import { UtileriasService } from '../../Servicios/Utilerias/utilerias.service';
import { CajaService } from '../../Servicios/Caja/caja.service';
import { TiposGastosService } from '../../Servicios/TiposGastos/tipos-gastos.service';
import { UsuarioService } from '../../Servicios/Usuario/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private cajaService: CajaService,
              private tiposGastosService: TiposGastosService,
              private usuarioService: UsuarioService,
              private tiposGastos: TiposGastosService,
              private util: UtileriasService) {
    this.cargarDatos();
  }
  ngOnInit() {
  }
  private cargarDatos() {
    this.util.crearLoading('Cargando datos. ¡ Porfavor espere !').then(() => {
      this.cajaService.cargarDatos(this.usuarioService.usuarioSession.usuario.id, this.usuarioService.usuarioSession.usuario.token).subscribe(result => {
        this.util.detenerLoading();
        //this.util.msjToast(result.msj, result.titulo, !result.open);
        this.tiposGastosService.tiposGasto.isExists = result.tiposGasto.exists;
        this.tiposGastosService.tiposGasto.tiposGasto = result.tiposGasto.tiposGasto;
        this.tiposGastosService.actualizarTiposGastosStorage().then(() => {
          this.cajaService.cajaAbierta.isOpen = result.open;
          this.cajaService.cajaAbierta.cajaOpen = result.caja;
          this.cajaService.actualizarCajaAbiertaStorage();
        });
      }, error => {
        this.util.msjToastErrorInterno(error.message);
      });
    });
  }
}
