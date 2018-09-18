import { Component, OnInit, Input, HostListener } from '@angular/core';

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
  statesAbv: any;
  years: any;
  sortModes: any;
  promIDH: number;
  IDHmax: number;
  IDHmin: number;
  promIDHstr: string;
  public innerWidth: any;
  public innerHeight: any;
  
  selectState() {
    alert(this.selState);
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }

  selectYear(){
    this.selYearNum = this.findYear();
    this.generateSummary();
    this.selectSortMode();
  }

  selectSortMode() {
    return this.selSortMode;
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
    this.selYear = '2010';
    this.selYearNum = 0;
    this.selSortMode = 'Alfabéticamente';
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    //Arreglos que contienen todas las opciones presentes en los dropdowns
    this.states = ['Aguascalientes','Baja California','Baja California Sur','Campeche','Chiapas','Chihuahua','Ciudad de México','Coahuila de Zaragoza','Colima','Durango','Estado de México',
    'Guanajuato','Guerrero','Hidalgo','Jalisco','Michoacán','Morelos','Nayarit','Nuevo León','Oaxaca','Puebla','Querétaro','Quintana Roo','San Luis Potosí','Sinaloa','Sonora',
    'Tabasco','Tamaulipas','Tlaxcala','Veracruz','Yucatán','Zacatecas'];
    this.statesAbv = ['AGU','BCN','BCS','CAM','CHP','CHH','CMX','COA','COL','DUR','MEX',
    'GUA','GRO','HID','JAL','MIC','MOR','NAY','NLE','OAX','PUE','QUE','ROO','SLP','SIN','SON',
    'TAB','TAM','TLA','VER','YUC','ZAC'];
    this.years = ['2010','2011','2012','2013','2014','2015','2016','2017'];
    this.sortModes = ['Alfabéticamente','Ascendente','Descendente'];
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
          this.statesAbv[j],
          this.states[j],
          Math.random()
      ]);
      }
      this.allData.push({
        year: this.years[i],
        idh: this.chartData
      });
    }
    console.log(this.allData);
    
  }

    generateSummary(){
      //Obtener el promedio de todos los IDH
      this.promIDH = 0;
      for(let i = 0; i < this.allData[this.selYearNum].idh.length; i++){
        this.promIDH += this.allData[this.selYearNum].idh[i][2];        
      }
      this.promIDH = (this.promIDH / 32);
      this.promIDHstr = this.promIDH.toFixed(2);
      //Obtener el IDH más alto
      this.allData[this.selYearNum].idh.sort(function(a, b){return b[2] > a[2] ? 1 : -1});
      this.IDHmax = this.allData[this.selYearNum].idh[1][2].toFixed(2);
      //Obtener el ID más bajo
      this.allData[this.selYearNum].idh.sort(function(a, b){return a[2] > b[2] ? 1 : -1});
      this.IDHmin = this.allData[this.selYearNum].idh[1][2].toFixed(2);
    }

    @HostListener('window:resize', ['$event'])
      onResize(event) {
      this.innerWidth = window.innerWidth;
      console.log(this.innerWidth);
      //this.innerHeight = window.innerHeight;
    }
}
