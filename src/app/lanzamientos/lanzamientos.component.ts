import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Lanzamiento {
  name: string, 
  slug: string, 
  net:string, 
  status: any
}
//los campos no coinciden ya con los nombres de la primera interfaz
//porque ya es distinta a la original cuando se hace el map por eso se cogen los datos que hemos manipulado
export interface Resultado {
  nombre: string, 
  slug: string, 
  hora:string, 
  status: any
}




@Component({
  selector: 'app-lanzamientos',
  templateUrl: './lanzamientos.component.html',
  styleUrls: ['./lanzamientos.component.css']
})
export class LanzamientosComponent implements OnInit {

  private urlApi = "https://lldev.thespacedevs.com/2.0.0/launch/";
//Vamos a crear una variable del tipo observable, para usarla en las peticiones
//en este caso se le pone un $ al final del nombre de la variable
//como convencion para que se vea facilmente que es una variable del
//tipo observable y diferenciarlas del resto de variables
  public siguientesLanzamientos$:Observable<any>;

 // public cuadrados$:Observable<any>;


//Usamos la inyeccion de dependencias para traer el httpClient
  constructor(private httpClient: HttpClient) {
    //una vez lo tenemos, podemos inicializar la peticion
    //ahora en vez de lanzar la peticion y poner una arrow function para capturar el retorno
    //nos quedamos con un observable que va contra el httpClient
    this.siguientesLanzamientos$ = this.httpClient.get<any>(this.urlApi);


    //vamos a  ver el uso de map que es el operador de transformacion
    //creo un observable atraves de una lista
    //map para manipular el dato tap para los logs
    /*var listaNumeros$ = from([1, 2, 3, 4, 5]);
    this.cuadrados$ = listaNumeros$.pipe(
      map(num => num * num),
      tap(x => console.log(x))
    );  */
  }

  //manipula el observable a traves de un pipe usando las funciones map y tap

  private mostrarLanzamientos(){
    //MAP MODIFICAR DATO TAG VISUALIZAR 
    //LOS MAP SIEMPRE SE USAN PARA MODIFICAR DATOS NUNCA PARA VERLOS, SIEMPRE DEVUELVEN ALGO CUIDADO CON ESO

    this.siguientesLanzamientos$ = this.httpClient.get<any>(this.urlApi).pipe (
      //este primer map indicamos que solo queremos quedar con la parte de los resultados
      //me quedo con una parte
      map(apiData => apiData.results),
      //ojo no confundir el map primero que es el propio de rxjs nos permite manipular los datos en el pipe
      //y el segundo es que apiData, en este caso es un array de resultados, y los array en JS 
      //tienen un metodo map que nos permite aplicar una funcion a cada elemento del array
      //hay que crear una interfaz para que lanzamiento funcione por estar en el modo stricto de JS
      //la interfaz esta arriba de la clase 
      map(apiData => apiData.map((lanzamiento: Lanzamiento) => ({
        nombre: lanzamiento.name,
        slug: lanzamiento.slug,
        hora: lanzamiento.net,
        status: lanzamiento.status.name 
      }))),
      //añadimos un campo mas al JSON con el empaquetado
      //... desempaquetamos y añadimos un campo más llamado colorEstado cuyo valor depende de si el 
      //lanzamiento es fallido o no. Usamos operador ternario para ello.
      //OJO la interfaz aqui es distinta del paso anterior porque ahora el array ya esta transformado´
      //con nuestros campos
      map(apiData => apiData.map((lanzar: Resultado) =>({
        ...lanzar,
        colorEstado: lanzar.status==="Failure" ? "red" : "green"
      }))),
      //usamos el tap para hacer por ejemplo de un log  de como estan los datos en este paso del pipe
      tap(apiData => console.log(apiData)),
      tap(apiData => console.log(apiData.length)),
      //no devolvería nada este map cuidado!!!!
      //map((apiData)=>{console.log(apiData);})
    );
  }

  ngOnInit(): void {

    this.mostrarLanzamientos();

    //ejemplos operadores of, from , map y tap
    //el of nos sirve para emitir eventos como observables de funciones
    //que en principio no lo son, como por ejemplo DATE
  //  var ejemplo$ = of(new Date().getMilliseconds());
    //ejemplo$.subscribe(resultado => console.log(resultado));

    //me permite usar iterables como origen de eventos individuales
    //dentro de un observable, realmente lo que hace es convertir este array en un streaming de datos
    //var lista$ = from(["uno","dos","tres"]);
    //lista$.subscribe(resultado => console.log(resultado));

    //y si le aplicamos una lista
    //lo trata como un observable pero no have un streaming con cada elemento del array
    //var listaOff$ = of(["a","e","i","o","u"]);
    //listaOff$.subscribe(resultado =>console.log(resultado));

 
    
  }

}
