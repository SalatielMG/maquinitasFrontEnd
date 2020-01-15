import { VistaCajaOpen } from '../Abierta/vistaCajaOpen';

export class VistaCajaClose extends VistaCajaOpen {
    nota: string;
    cntAbierto: number;
    constructor(nota = "", cntAbierto = 0) {
        super();
        this.nota = nota;
        this.cntAbierto =  cntAbierto;
    }
}
