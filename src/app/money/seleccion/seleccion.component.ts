import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.css']
})
export class SeleccionComponent implements OnInit {

  public divisas:string;
  private urlApi = 'https://api.exchangerate.host/latest';
  public datosWS:any = null;
  public listaPaises="";

  constructor(private httpClient:HttpClient) {
    this.divisas = '';
   }

  ngOnInit(): void {
    var datos = localStorage.getItem("Paises");
    if(datos!=null && typeof (datos)!="undefined")
    {
      this.listaPaises = JSON.parse(datos);
    }
    else
    {
      this.listarPaises();
    }
    this.getDivisas();

  }

  private listarPaises()
  {

    this.httpClient.get(this.urlApi).subscribe(apiData => {
      var lista:any = apiData;
      var paises = new Array();
      for (var [key,value] of Object.entries(lista.rates))
      {
        paises.push(key);
      }
      localStorage.setItem("Paises", JSON.stringify(paises));
    });

  }

  public getDivisas(){
    const url = `${this.urlApi}?symbols=${this.divisas}`;
    this.httpClient.get(url).subscribe(apiData =>
      {
        this.datosWS = apiData;
        console.log(this.datosWS);
      }
    );
  }
}
