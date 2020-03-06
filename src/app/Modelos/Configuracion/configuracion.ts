export class Configuracion {
    modeDark: boolean;
    multipleSesion: boolean;
    constructor(
        modeDark = false,
        multipleSesion = false
    ) {
        this.modeDark = modeDark;
        this.multipleSesion = multipleSesion;
    }
}
