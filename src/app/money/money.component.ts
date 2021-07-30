import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.css']
})
export class MoneyComponent implements OnInit {
  //vamos a definir una variable para guardar la URL del
  //servicio web
  private urlapi = 'https://api.exchangerate.host/latest';

  //vamos a crear una variable para guardar los datos recuperados en el metodo getCambios
  public datosWS:any = null;

  //Vamos a crear una variable para decidir de que divisisas queremos tener el cambio
  public divisas ="USD,GBP,JPY";

  //importamos a traves de la inyeccion de dependencias el HttpClient
  //acordaros de importar previamente el modulo en el *.module.ts
  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    //lo invocamos al principio del componente
    this.getCambios();
  }

  //vamos a crear un metodo para realizar las peticiones de datos
  private getCambios()
  {
    //montamos la URL, aprovechamos para repasar la interpolacion de string y variables
    //en ES6
    const url = `${this.urlapi}?symbols=${this.divisas}`;
    //probamos a recuperar los datos, esto funciona como una promise
    //el get nos permite devolver datos de la url que se le pasa como parametro
    //con el subscribe nos subscribimos a la promesa generada por el get
    //recibe como parametro una funcion que se ejecutara cuando recuperemos los valores
    this.httpClient.get(url).subscribe(apiData => (this.datosWS = apiData));
  }
}
