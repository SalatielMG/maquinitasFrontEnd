import { VistaCajaOpen } from './vistaCajaOpen';

export class CajaAbierta {
    isOpen: boolean;
    cajaOpen: VistaCajaOpen;
    constructor(
        isOpen = false,
        cajaOpen = new VistaCajaOpen()
    ) {
        this.isOpen = isOpen;
        this.cajaOpen = cajaOpen;
    }
}
