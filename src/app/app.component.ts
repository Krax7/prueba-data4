import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @Input() dropdownTitle;
  private allData: Array<any>;
  private chartData: Array<any>;
  private selState: string;
  private selYear: string;
  private selYearNum: number;
  private selSortMode: string;
  states: any;
  years: any;
  sortModes: any;
  promIDH: number;
  IDHmax: number;
  IDHmin: number;
  promIDHstr: string;
  IDHmaxstr: string;
  IDHminstr: string;

  selectState() {
    alert(this.selState);
  }

  selectYear(){
    this.selYearNum = this.findYear();
    this.selectSortMode();
  }

  selectSortMode() {
    switch (this.selSortMode) {
      case 'Ascendente':
        this.allData[this.selYearNum].idh.sort(function(a, b){return a[1] > b[1] ? 1 : -1});
        console.log('Después:');
        console.log(this.allData[this.selYearNum].idh);
        break;

      case 'Descendente':
        this.allData[this.selYearNum].idh.sort(function(a, b){return b[1] > a[1] ? 1 : -1});
        break;

      case 'Alfabéticamente':
        this.allData[this.selYearNum].idh.sort();
        console.log('Alfabéticamente:');
        console.log(this.allData[this.selYearNum].idh);
        break;

      default:
        console.log('Alfabéticamente:');
        console.log(this.allData[this.selYearNum].idh);
        this.allData[this.selYearNum].idh.sort();
        break;
    }
  }

  findYear(){
    for (let i = 0; i < this.allData.length; i++){
      if(this.allData[i].year === this.selYear){
        console.log("Año encontrado " + i);
        return i;
      }
    }
  }

  constructor() {
    this.selState = "";
    this.selYear = "2010";
    this.selYearNum = 0;
    this.selSortMode = 'Alfabeticamente';
  }

  ngOnInit() {
    //Arreglos que contienen todas las opciones presentes en los dropdowns
    this.states = ['Aguascalientes','Baja California','Baja California Sur','Campeche','Chiapas','Chihuahua','Ciudad de México','Coahuila de Zaragoza','Colima','Durango','Estado de México',
    'Guanajuato','Guerrero','Hidalgo','Jalisco','Michoacán','Morelos','Nayarit','Nuevo León','Oaxaca','Puebla','Querétaro','Quintana Roo','San Luis Potosí','Sinaloa','Sonora',
    'Tabasco','Tamaulipas','Tlaxcala','Veracruz','Yucatán','Zacatecas'];
    this.years = ['2010','2011','2012','2013','2014','2015','2016','2017'];
    this.sortModes = ['Ascendente','Descendente','Alfabéticamente'];
    //Se generan los datos
    this.generateData();
    //Se obtiene el promedio de los IDH, el más alto y el más bajo de ellos.
    this.generateSummary();
  }

  generateData() {
    this.allData = [];
    for (let i = 0; i < this.years.length; i++){
      this.chartData = [];
      for (let j = 0; j < this.states.length; j++) {
        this.chartData.push([
        this.states[j],
        Math.random()
      ]);
      }
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
        this.promIDH += this.allData[this.selYearNum].idh[i][1];        
      }
      this.promIDH = this.promIDH / 32;
      this.promIDHstr = this.promIDH.toFixed(2);
      console.log(this.promIDH);
      //Obtener el IDH más alto
      this.allData[this.selYearNum].idh.sort(function(a, b){return b[1] > a[1] ? 1 : -1});
      this.IDHmin = this.allData[this.selYearNum].idh[0][1];
      this.IDHminstr = this.IDHmin.toFixed(2);
      //Obtener el ID más bajo
      this.allData[this.selYearNum].idh.sort(function(a, b){return a[1] > b[1] ? 1 : -1});
      this.IDHmax = this.allData[this.selYearNum].idh[0][1];
      this.IDHmaxstr = this.IDHmax.toFixed(2);

      this.selectSortMode();
    }
}
