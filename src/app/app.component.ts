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
  nameList: any;
  states: any;
  years: any;
  sortModes: any;

  getNameList() {
    this.nameList = this.states;
  }

  selectState() {
    alert(this.selState);
  }

  selectYear(){
    alert(this.selYear);
    this.selYearNum = this.findYear();
  }

  selectSortMode() {
    alert(this.selSortMode);
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
    this.getNameList();
    this.selState = "";
    this.selYearNum = 0;
    this.selSortMode = "";
  }

  ngOnInit() {
    this.states = ['Aguascalientes','Baja California','Baja California Sur','Campeche','Coahuila de Zaragoza','Colima','Chiapas','Chihuahua','Ciudad de México','Durango','Guanajuato','Guerrero',
    'Hidalgo','Jalisco','Estado de México','Michoacán','Morelos','Nayarit','Nuevo León','Oaxaca','Puebla','Querétaro','Quintana Roo','San Luis Potosí','Sinaloa','Sonora',
    'Tabasco','Tamaulipas','Tlaxcala','Veracruz','Yucatán','Zacatecas'];
    this.years = ['2012','2013','2014','2015','2016','2017'];
    this.sortModes = ['Ascendente','Descendente','Alfabéticamente'];
    // give everything a chance to get loaded before starting the animation to reduce choppiness
    this.generateData();
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
    //console.log(this.allData);
    //console.log(this.chartData);
    }
}
