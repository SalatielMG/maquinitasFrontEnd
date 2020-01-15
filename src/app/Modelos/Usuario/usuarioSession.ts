import { Usuario } from './usuario';

export class UsuarioSession {
    isSessionOpen: boolean;
    usuario: Usuario;
    constructor(
        isSessionOpen = false,
        usuario = new Usuario()
    ) {
        this.isSessionOpen = isSessionOpen;
        this.usuario = usuario;
    }
}
