export class Usuario {
    id: number;
    usuario: string;
    email: string;
    password: string;
    tipo: string;
    imagen: string;
    codigo: string;
    token: string;
    constructor(
        id = 0,
        usuario = "",
        email = '',
        pasword = '',
        tipo = 'admin',
        imagen = 'anonymus.png',
        token = ''
    ) {
        this.id = id;
        this.usuario = usuario;
        this.email = email;
        this.password = pasword;
        this.tipo = tipo;
        this.imagen = imagen;
        this.token = token;
    }
}
