import { Capitulo } from './capitulo';

export class Articulo{
    id?:number;
    capitulo?:Capitulo;
    titulo?:string;
    multa?:number;
    puntoscarnet?:number;
    habilitado?:boolean;
    retirovehiculo?:boolean;
    anyosPF?:number;
    itemLock:number = 0;
    fianza:boolean;
    constructor(id?:number, capitulo?:Capitulo, titulo?:string, multa?:number, puntoscarnet?:number, habilitado?:boolean, retirovehiculo?:boolean, anyosPF?:number, fianza?:boolean)
    {
        this.id = id;
        this.capitulo = capitulo;
        this.titulo = titulo;
        this.multa = multa;
        this.puntoscarnet = puntoscarnet;
        this.retirovehiculo = retirovehiculo;
        this.anyosPF = anyosPF;
        this.habilitado = false;
        this.itemLock = 0;
        this.fianza = fianza;
    }
}