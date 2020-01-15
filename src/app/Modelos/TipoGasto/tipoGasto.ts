export class TipoGasto {
    id: number;
    nombre: string;
    descripcion: string;

    constructor(
        id = 0,
        nombre = "",
        descripcion = ""
    ) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}
