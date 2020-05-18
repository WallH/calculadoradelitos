import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { Articulo } from '../models/articulo';
import { Capitulo } from '../models/capitulo';
import { Agravante } from '../models/agravante';
import { Prevalece } from '../models/prevalece';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  
  constructor(private http: HttpClient) { }
  getPrevalece() {
    this.http.head("Access-Control-Allow-Origin: *");
    return this.http.get<any[]>('https://tojupro.com/rest/public/index.php/prevalece/');
  }
  getCapitulos() {
    this.http.head("Access-Control-Allow-Origin: *");
    return this.http.get<any[]>('https://tojupro.com/rest/public/index.php/capitulo/');
  }
  getArticles() {
    this.http.head("Access-Control-Allow-Origin: *");
    return this.http.get<Articulo[]>('https://tojupro.com/rest/public/index.php/articulo/');
  }
  getAgravante() {
    this.http.head("Access-Control-Allow-Origin: *");
    return this.http.get<Agravante[]>('https://tojupro.com/rest/public/index.php/agravante/');
  }
  /*getArticles()
  {
    return this.http.get("http://localhost/rest/public/index.php/articulo/").map
  }*/
}
