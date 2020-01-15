export class Gasto {
    id: number;
    caja: number;
    fecha: string;
    gasto: number;
    tipo: number;
    descripcion: string;
    status: number;
    idTipo: number;
    nombre: string;
    descripciontipogasto: string;
    constructor(
        id = 0,
        caja = 0,
        fecha = "",
        gasto = 0,
        tipo = 0,
        descripcion = "",
        status = 0,
        idTipo = 0,
        nombre = "",
        descripciontipogasto = "",
    ) {
        this.id = id;
        this.caja = caja;
        this.fecha = fecha;
        this.gasto = gasto;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.status = status;
        this.idTipo = idTipo;
        this.nombre = nombre;
        this.descripciontipogasto = descripciontipogasto;
    }
}
