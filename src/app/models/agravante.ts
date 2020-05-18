import { Articulo } from './articulo';

export class Agravante
{
    id:number;
    Articulo:Articulo;
    titulo:string;
    anyospf:number;
    multa:number;
    puntoslicencia:number;
    agregado:number;
    constructor(id?:number, Articulo?:Articulo, titulo?:string, anyospf?:number, multa?:number, puntoslicencia?:number, agregado?:number)
    {
        this.id = id;
        this.Articulo = Articulo;
        this.titulo = titulo;
        this.anyospf = anyospf;
        this.multa = multa;
        this.puntoslicencia = puntoslicencia;
        this.agregado = agregado;
    }
}