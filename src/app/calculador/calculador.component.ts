import { Component, OnInit } from '@angular/core';
import { Articulo } from '../models/articulo';
import { isNgTemplate } from '@angular/compiler';
import { CalculatorService } from './calculatorservice';
import { Agravante } from '../models/agravante';
import { Atenuante } from '../models/atenuante';
import { Prevalece } from '../models/prevalece';
import { Capitulo } from '../models/capitulo';

@Component({
  selector: 'app-calculador',
  templateUrl: './calculador.component.html',
  styleUrls: ['./calculador.component.css']
})
export class CalculadorComponent implements OnInit {

  multaPrecio:number;
  puntosLicencia:number;
  anyosPFCalc:number;
  calabozosAcum:number;
  multasAcum:number;
  listArt:Array<Articulo>;

  listPre:Map<number, Array< Articulo> >;
  listSelected:Array<Articulo>;
  listElem:Map<number, Array<Agravante> >;
  listAtenuantes:Array<Atenuante>;
  listAgravantes:Array<Atenuante>;
  mostrarAtt:boolean;
  mostrarAgrr:boolean;
  selectAten:boolean;
  selectAgr:boolean;
  atenuanteSelect:Atenuante;
  atenuanteProv:Atenuante;
  listCapitulo:Array<Capitulo>;
  nombrePersona:string = "";
  constructor(private calcService:CalculatorService) {
    //this.listArt = new Array<Articulo>();
  /*  this.listArt.push(new Articulo(1, 1,"Artículo 1.1 Conducción temeraria", 4000, 3, false, false, 0));
    var art = new Articulo(2, 1,"Artículo 1.2 Daños a la propiedad privada o pública", 1500, 0, false, false, 0)
    this.listArt.push(art);
    this.listPre = new Map<number, Array<Articulo> >();
    this.listPre.set(1, new Array<Articulo>());
    this.listPre.get(1).push(this.listArt[1]);*/
    this.listPre = new Map<number, Array<Articulo> >();
    this.listSelected =new Array<Articulo>();
    this.listElem = new Map<number, Array<Agravante> >();
    this.listArt = new Array<Articulo>();
    this.atenuanteProv = new Atenuante("", 1);
    this.cargarArticulos();
    this.cargarAgravante();
    this.anyosPFCalc = 0;
    this.calabozosAcum = 0;
    this.puntosLicencia = 0;
    this.multasAcum = 0;
    this.listAgravantes = new Array<Atenuante>();
    this.cargarAgravantes();
    this.listAtenuantes = new Array<Atenuante>();
    this.cargarAtenuantes();
    this.mostrarAtt = false;
    this.mostrarAgrr = false;
    this.cargarCapitulos();

    this.cargarPrevalece();
    this.atenuanteSelect = this.atenuanteProv;

  }
  mostrarAt()
  {
    this.mostrarAtt= !this.mostrarAtt;
  }
  mostrarAgr()
  {
    this.mostrarAgrr= !this.mostrarAgrr;
  }
  selectAtenuante(at: Atenuante)
  {
    if(at.selected == true)
    { 
      at.selected = false;
      this.atenuanteSelect = this.atenuanteProv;
      return;
    }
    this.atenuanteSelect.selected = false;
    this.atenuanteSelect = at;
    at.selected = true;
  }
  cargarAtenuantes()
  {
    this.listAtenuantes.push(new Atenuante("Actuar bajo los efectos de sustancias ilícitas (drogas en general) o alcohol a causa de su grave adicción o por algún tipo de enfermedad.", 0.33333333));
    this.listAtenuantes.push(new Atenuante("Confesión del delito durante el procesamiento y hasta antes del cumplimiento de la condena.", 0.33333333));
    this.listAtenuantes.push(new Atenuante("Confesión del delito antes de su detención y por propia voluntad.", 0.5));
    this.listAtenuantes.push(new Atenuante("La de haber procedido el culpable a reparar el daño ocasionado a la víctima, o disminuir sus efectos, en cualquier momento del procedimiento y con anterioridad al cumplimiento de la pena.", 0.5));
    this.listAtenuantes.push(new Atenuante("No poseer antecedentes penales, exceptuando los del capitulo 1 y 7", 0.5));
    this.listAtenuantes.push(new Atenuante("6. Buena cooperación y conducta durante el arresto y procesamiento.", 0.5));
    this.listAtenuantes.push(new Atenuante("Tener el acusado menos de 18 años, siempre que no se cometan en delitos contra el estado (Cap. 9) o asesinato en los cuales no sera aplicable este atenuante.", 0.5));
    this.listAtenuantes.push(new Atenuante("Parentesco: Relación familiar con la víctima demostrable.", 0.5));
  }
  cargarAgravantes()
  {
    this.listAgravantes.push(new Atenuante("Ejecutar el hecho con alevosía.", 1.25));
    this.listAgravantes.push(new Atenuante("Ejecutar el hecho mediante disfraz, con abuso de superioridad o aprovechando las circunstancias de lugar, tiempo o auxilio de otras personas que debiliten la defensa del ofendido o faciliten la impunidad del delincuente.", 1.25));
    this.listAgravantes.push(new Atenuante("Ejecutar el hecho mediante precio, recompensa o promesa.", 2));
    this.listAgravantes.push(new Atenuante("Cometer el delito por motivos racistas, antisemitas u otra clase de discriminación referente a la ideología, religión o creencias de la víctima, la etnia, raza o nación a la que pertenezca, su sexo, orientación o identidad sexual, razones de género, la enfermedad que padezca o su discapacidad.", 1.25));
    this.listAgravantes.push(new Atenuante("Obrar con abuso de confianza.", 1.00));
    this.listAgravantes.push(new Atenuante("Prevalerse del carácter público que tenga el culpable.", 2));
    this.listAgravantes.push(new Atenuante("Ser reincidente.", 1.20));
    this.listAgravantes.push(new Atenuante("Prevalimiento.", 1.25));

  }
  ngOnInit() {
  }
  cargarCapitulos()
  {
    this.listCapitulo = new Array<Capitulo>();
    var calcComp = this;
    this.calcService.getCapitulos().subscribe(
      result => {
        let prevArr:Array<any> = result as Array<any>;
        prevArr.forEach( function(it)
        {
          calcComp.listCapitulo.push( new Capitulo(it.id, it.titulo, it.descripcion));
        });
       // console.log('Capítulos', result);
//        this.listArt = data;
      });
      console.log(this.listCapitulo);
  }
  cargarAgravante()
  {
    let arPiv:Array<Agravante>;
    let comp = this;
    this.calcService.getAgravante().subscribe(
      data=>
      {
        arPiv = data as Array<Agravante>;
        arPiv.forEach( function(item)
        {
          if(!comp.listElem.has(item.Articulo.id)) comp.listElem.set(item.Articulo.id, new Array<Agravante>());
          comp.listElem.get(item.Articulo.id).push(item);
        });
      }
    );

  }
  cargarPrevalece()
  {
    /* REVISAR XD*/
    var calcComp = this;
    this.calcService.getPrevalece().subscribe(
      data=>
      {
        let prevArr:Array<any> = data as Array<any>;
        prevArr.forEach(function(item)
        {
         // console.log(item);
          if(!calcComp.listPre.has(item.articuloA.id)) calcComp.listPre.set(item.articuloA.id, new Array<Articulo>());
          calcComp.listPre.get(item.articuloA.id).push(calcComp.listArt[item.articuloB.id-1]);
        });
      }
    );
    console.log(this.listPre);
   /* this.calcService.getPrevalece().subscribe(

    );*/
  }
  cargarArticulos()
  {
    this.calcService.getArticles().subscribe(
      result => {
        this.listArt = result as Array<Articulo>;
//        data.forEach()
    //    console.log(data);
    
//        console.log("TEST");
      });

      //console.log(this.listArt);
  }
  listArtCap(val:Capitulo)
  {
    let ret = new Array<Capitulo>();
    this.listArt.forEach( function(item)
    {
      if(item.capitulo.id == val.id)
      {
        ret.push(item);
      }
    });
    return ret;
  }
  mostrarCap(val:Capitulo)
  {
    val.habilitado = !val.habilitado;
  }
  prevalece(val:Articulo)
  {
    if(!this.listPre.has(val.id)) return;
    var calcComp = this;
    this.listPre.get(val.id).forEach( function(item)
    {
      if(val.habilitado)
      {
        item.habilitado = false;
        calcComp.prevalece(item);
        item.itemLock++;
      }
      else
      {
        if(item.itemLock > 0) item.itemLock--;
        else item.itemLock = 0;
      }
    });
    //this.calcular();
  }

  calcular()
  {
    this.anyosPFCalc = 0;
    this.calabozosAcum = 0;
    this.puntosLicencia = 0;
    this.multasAcum = 0;

    this.listSelected = new Array<Articulo>();
    var calcComp = this;
    this.listArt.forEach( function(item)
    {

      if(item.habilitado)
      {
        calcComp.puntosLicencia+=item.puntoscarnet;
        if(item.id == 56 || item.id == 62)
        {
          if(item.id == 56)
          {
            let val:boolean = false;
            calcComp.listElem.get(item.id).forEach(function(it)
            {
              if(it.agregado > 0)
              { 
                calcComp.multasAcum+= it.agregado*it.multa;
                calcComp.puntosLicencia+= it.agregado*it.puntoslicencia;
              
                if(val == false) val = it.id > 3;

              }
            }
            );

            if(val) calcComp.anyosPFCalc+=2;
          }
          else
          {
            var sum:number = 0;
            calcComp.listElem.get(item.id).forEach(function(it)
            {
              if(it.agregado > 0)
              { 
                calcComp.multasAcum+= it.agregado*it.multa;
                calcComp.puntosLicencia+= it.agregado*it.puntoslicencia;
                sum+=it.agregado;
              }
              
            }
            );
            if(sum > 5)calcComp.calabozosAcum++;
          }
        }
        else
        {
          if(calcComp.listElem.has(item.id))
          {
            calcComp.listElem.get(item.id).forEach(function(it)
            {
              if(it.agregado > 0)
              { 
                calcComp.multasAcum+= it.agregado*it.multa;
                calcComp.puntosLicencia+= it.agregado*it.puntoslicencia;
                calcComp.anyosPFCalc+= it.anyospf*it.agregado;
              }
            });
  
          }
          if(item.anyosPF == -1)
          {
            calcComp.calabozosAcum++;
          }
          else calcComp.anyosPFCalc+= item.anyosPF;  
        }
        calcComp.multasAcum += item.multa;
        calcComp.listSelected.push(item);
        
      }
    });
  }
  cargosconFianza()
  {
    let ret = new Array<Articulo>();
    this.listSelected.forEach( function(item)
    {
      if(item.fianza)
      {
        if(item.id == 56)
        {
          ret.push(new Articulo(item.id, item.capitulo, item.titulo, item.multa, item.puntoscarnet, item.habilitado, item.retirovehiculo, 2, item.fianza));
        }
        else if(item.id == 62)
        {
          ret.push(new Articulo(item.id, item.capitulo, item.titulo, item.multa, item.puntoscarnet, item.habilitado, item.retirovehiculo, 1, item.fianza));          
        }
        else
        {
          ret.push(item);

  
        }
      }
    });
    return ret;
  }
  cargar(val:Articulo)
  {
    if(val.itemLock > 0) return;
    val.habilitado = !val.habilitado;
    this.prevalece(val);
    this.calcular();

  }
}
