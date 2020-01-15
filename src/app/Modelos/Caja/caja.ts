export class Caja {
    id: number;
    monto1: number;
    monto5: number;
    fechaAbierto: string;
    corte: number;
    fechaCorte: string;

    constructor(
        id = 0,
        monto1 = 0,
        monto5 = 0,
        fechaAbierto = "",
        corte = 0,
        fechaCorte = ""
    ) {
        this.id = id;
        this.monto1 = monto1;
        this.monto5 = monto5;
        this.fechaAbierto = fechaAbierto;
        this.corte = corte;
        this.fechaCorte = fechaCorte;
    }
}
