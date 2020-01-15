import { TipoGasto } from './tipoGasto';

export class TiposGasto {
    isExists: boolean;
    tiposGasto: TipoGasto[];
    constructor(
        isExists = false,
        tiposGasto = []
    ) {
       this.isExists = isExists;
       this.tiposGasto = tiposGasto;
    }
}
