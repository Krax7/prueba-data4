import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() dropdownTitle;
  actions = [
    ['Aguascalientes','Baja California','Baja California Sur','Campeche','Coahuila de Zaragoza','Colima','Chiapas','Chihuahua','Ciudad de México','Durango','Guanajuato','Guerrero',
    'Hidalgo','Jalisco','Estado de México','Michoacán','Morelos','Nayarit','Nuevo León','Oaxaca','Puebla','Querétaro','Quintana Roo','San Luis Potosí','Sinaloa','Sonora',
    'Tabasco','Tamaulipas','Tlaxcala','Veracruz','Yucatán','Zacatecas'],
    ['2012','2013','2014','2015','2016','2017'],
    ['Ascendente','Descendente','Alfabéticamente']
  ]
  constructor() { }

  ngOnInit() {
  }

}
