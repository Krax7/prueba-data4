import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private allData: Array<any>;
  private chartData: Array<any>;
  states = ['Aguascalientes','Baja California','Baja California Sur','Campeche','Coahuila de Zaragoza','Colima','Chiapas','Chihuahua','Ciudad de México','Durango','Guanajuato','Guerrero',
  'Hidalgo','Jalisco','Estado de México','Michoacán','Morelos','Nayarit','Nuevo León','Oaxaca','Puebla','Querétaro','Quintana Roo','San Luis Potosí','Sinaloa','Sonora',
  'Tabasco','Tamaulipas','Tlaxcala','Veracruz','Yucatán','Zacatecas'];
  years = ['2012','2013','2014','2015','2016','2017'];
  sortModes = ['Ascendente','Descendente','Alfabéticamente'];
  dropdowns = ['Estado','Año','Ordenar datos'];

  constructor() {

  }

  ngOnInit() {
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
        //for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
        idh: this.chartData
      });
    }
    //console.log(this.allData);
    //console.log(this.chartData);
    }
    
  //data = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  //  .map((month: string) => ({
  //    name: month,
  //    value: Math.random() * 100
  //  }));
}
