
export class Capitulo
{
    id?:number;
    titulo?:string;
    descripcion?:string;
    habilitado?:boolean = true;
    constructor(id?:number,titulo?:string, descripcion?:string)
    {   
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.habilitado = true;
    }
}