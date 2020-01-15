export class Devolucion {
    id: number;
    caja: number;
    fecha: string;
    tipo: number;
    cantidad: number;
    status: number;
    constructor(
        id = 0,
        caja = 0,
        fecha = "",
        tipo = 0,
        cantidad = 0,
        status = 0,
    ){
        this.id = id;
        this.caja = caja;
        this.fecha = fecha;
        this.tipo = tipo;
        this.cantidad = cantidad;
        this.status = status;
    }
}
