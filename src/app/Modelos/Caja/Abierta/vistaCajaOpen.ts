export class VistaCajaOpen {
    id: number;
    monto1: number;
    monto5: number;
    fechaAbierto: string;
    corte: number;
    fechaCorte: string;
    status: number;
    totaldevolucion1: number;
    totaldevolucion5: number;
    totalgastos: number;
    
    constructor(
        id = 0,
        monto1 = 0,
        monto5 = 0,
        fechaAbierto = "",
        corte = 0,
        fechaCorte = "",
        status = 0,
        totaldevolucion1 = 0,
        totaldevolucion5 = 0,
        totalgastos = 0,
    ){
        this.id = id;
        this.monto1 = monto1;
        this.monto5 = monto5;
        this.fechaAbierto = fechaAbierto;
        this.corte = corte;
        this.fechaCorte = fechaCorte;
        this.status = status;
        this.totaldevolucion1 = totaldevolucion1;
        this.totaldevolucion5 = totaldevolucion5;
        this.totalgastos = totalgastos;
    }
}
