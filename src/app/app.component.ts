import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private allData: Array<any>; // Arreglo para el dataset generado
  private chartData: Array<any>; // Arrelo para los valores de IDH por estado
  private selState: string; // Variable para el valor seleccionado en el dropdown "Estado"
  private selYear: string; // Variable para el valor seleccionado en el dropdown "Año"
  private selYearNum: number; // Variable para el índice del valor seleccionado en el dropdown "Año"
  private selSortMode: string; // Variable para el valor seleccionado en el dropdown "Ordenar por"
  states: any; // Variable para el arreglo de nombres de estados
  statesAbv: any; // Variable para el arreglo de nombres abreviados de estados
  years: any; // Variable para el arreglo de rango de años
  sortModes: any; // Variable para el arreglo de los tipos de ordenamiento
  promIDH: number; // Variable para el promedio de todos los IDH
  IDHmax: number; // Variable para el valor máximo de todos los IDH
  IDHmin: number; // Variable para el valor mínimo de todos los IDH
  promIDHstr: string; // Variable para la conversión a cadena de promIDH
  public innerWidth: any; // Variable que almacena el ancho de la pantalla en pixeles
  public innerHeight: any; // Variable que almacena la altura de la pantalla en pixeles

  constructor() { // Constructor para la clase actual. Inicializa las variables de control
                  // del componente bar-chart.
    this.selState = 'Aguascalientes';
    this.selYear = '2010';
    this.selYearNum = 0;
    this.selSortMode = 'Alfabéticamente';
  }
  
  selectState() { // Función invocada al seleccionar un estado en el dropdown 'Estado'
    if (this.innerWidth >= 480) {
      return this.selState; // Si el tamaño de la pantalla es mayor a 480px, retorna el nombre 
                            // completo del estado
    } else {
      let x = this.states.indexOf(this.selState);
      this.selState = this.statesAbv[x];
      return this.selState; // Si el tamaño de la pantalla es menor a 480px, retorna el nombre 
                            // abreviado del estado
    }
  }

  selectYear(){ // Función invocada al seleccionar un año en el dropdown 'Año'
    this.selYearNum = this.findYear(); // Se obtiene el índice del año seleccionado para acceder al
                                       // dataset de la siguiente manera: allData[año].idh
    this.generateSummary(); // Se llama a la función que genera el resumen de IDH por año
    this.selectSortMode(); // Se llama a la función que devuelve la opción de ordenamiento seleccionada
                          // esto para conservar el ordenamiento actual en el siguiente despliegue de datos
  }

  selectSortMode() { // Función invocada al seleccionar un modo de ordenamiento en el dropdown 'Ordenar por'
    return this.selSortMode; // Retorna la opción de ordenamiento seleccionada
  }

  findYear(){ // Función que retorna la posición de una cadena 'año', p.e: '2012' en el dataset
    for (let i = 0; i < this.allData.length; i++){
      if(this.allData[i].year === this.selYear){
        return i;
      }
    }
  }

  ngOnInit() { // Función de inicialización para el componente actual
    this.innerWidth = window.innerWidth; // Se inicializa la variable innerWidth con el ancho actual de la pantalla en pixeles
    // Arreglos que contienen todas las opciones presentes en los dropdowns
    this.states = ['Aguascalientes','Baja California','Baja California Sur','Campeche','Chiapas','Chihuahua','Ciudad de México','Coahuila de Zaragoza','Colima','Durango','Estado de México',
    'Guanajuato','Guerrero','Hidalgo','Jalisco','Michoacán','Morelos','Nayarit','Nuevo León','Oaxaca','Puebla','Querétaro','Quintana Roo','San Luis Potosí','Sinaloa','Sonora',
    'Tabasco','Tamaulipas','Tlaxcala','Veracruz','Yucatán','Zacatecas'];
    this.statesAbv = ['AGU','BCN','BCS','CAM','CHP','CHH','CMX','COA','COL','DUR','MEX',
    'GUA','GRO','HID','JAL','MIC','MOR','NAY','NLE','OAX','PUE','QUE','ROO','SLP','SIN','SON',
    'TAB','TAM','TLA','VER','YUC','ZAC'];
    this.years = ['2010','2011','2012','2013','2014','2015','2016','2017'];
    this.sortModes = ['Alfabéticamente','Ascendente','Descendente'];
    //Se generan los datos de forma aleatoria
    this.generateData();
    //Se obtiene el promedio de los IDH, el más alto y el más bajo de ellos
    this.generateSummary();
  }

  generateData() {
    this.allData = []; // Arreglo para el dataset
    for (let i = 0; i < this.years.length; i++){
      this.chartData = [];
      // Genera el dataset de IDH por estado con el siguiente formato:
      // ['nombre_estado_abreviado','nombre_estado_completo',idh_del_estado]
      for (let j = 0; j < this.states.length; j++) { 
        this.chartData.push([
          this.statesAbv[j],
          this.states[j],
          Math.random()
      ]);
      }
      // Encapsula el año y chartData en un arreglo de objetos con el siguiente formato:
      // { { year : 'año1' , idh : Array(32) } , { year : 'año2' } }
      this.allData.push({
        year: this.years[i],
        idh: this.chartData
      });
    }
  }

    generateSummary(){
      //Obtener el promedio de todos los IDH
      this.promIDH = 0;
      for(let i = 0; i < this.allData[this.selYearNum].idh.length; i++){
        this.promIDH += this.allData[this.selYearNum].idh[i][2]; // Suma todos los IDH de un año determinado      
      }
      this.promIDH = (this.promIDH / 32); // Calcula el promedio
      this.promIDHstr = this.promIDH.toFixed(2);
      //Obtener el IDH más alto
      this.allData[this.selYearNum].idh.sort(function(a, b){return b[2] > a[2] ? 1 : -1}); // Obtiene el IDH del estado que quedó
                                                                                           // como el más alto en el ordenamiento
      this.IDHmax = this.allData[this.selYearNum].idh[1][2].toFixed(2); 
      //Obtener el ID más bajo
      this.allData[this.selYearNum].idh.sort(function(a, b){return a[2] > b[2] ? 1 : -1}); // Obtiene el IDH del estado que quedó
                                                                                           // como el más bajo en el ordenamiento
      this.IDHmin = this.allData[this.selYearNum].idh[1][2].toFixed(2); 
    }

    @HostListener('window:resize', ['$event']) // Permite obtener el valor del ancho de la pantalla cada que este cambia
      onResize(event) {
      this.innerWidth = window.innerWidth;
    }
}
