export class Atenuante
{
    titulo?:string;
    exp?:number;
    selected?:boolean = false;
    constructor(titulo?:string, exp?:number)
    {
        this.titulo = titulo;
        this.exp = exp;
    }
}