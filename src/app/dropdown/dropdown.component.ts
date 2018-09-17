import { Component, OnInit, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownComponent implements OnInit {
  @Input() dropdownTitle;
  nameList: any;
  states: any;
  years: any;
  sortModes: any;
  nameId: string;

  constructor() {
    this.getNameList();
  }
  getNameList() {
    this.nameList = this.states;
  }
  selectName() {
    alert(this.nameId);
  }

  ngOnInit() {
    this.states = [
      { id: '1', stateName: 'Aguascalientes' },
      { id: '2', stateName: 'Baja California' },
      { id: '3', stateName: 'Baja California Sur' },
      { id: '4', stateName: 'Campeche' },
      { id: '5', stateName: 'Coahuila de Zaragoza' },
      { id: '6', stateName: 'Colima' },
      { id: '7', stateName: 'Chiapas' },
      { id: '8', stateName: 'Chihuahua' },
      { id: '9', stateName: 'Ciudad de México' },
      { id: '10', stateName: 'Durango' },
      { id: '11', stateName: 'Guanajuato' },
      { id: '12', stateName: 'Guerrero' },
      { id: '13', stateName: 'Hidalgo' },
      { id: '14', stateName: 'Jalisco' },
      { id: '15', stateName: 'Estado de México' },
      { id: '16', stateName: 'Michoacán' },
      { id: '17', stateName: 'Morelos' },
      { id: '18', stateName: 'Nayarit' },
      { id: '19', stateName: 'Nuevo León' },
      { id: '20', stateName: 'Oaxaca' },
      { id: '21', stateName: 'Puebla' },
      { id: '22', stateName: 'Querétaro' },
      { id: '23', stateName: 'Quintana Roo' },
      { id: '24', stateName: 'San Luis Potosí' },
      { id: '25', stateName: 'Sinaloa' },
      { id: '26', stateName: 'Sonora' },
      { id: '27', stateName: 'Tabasco' },
      { id: '28', stateName: 'Tamaulipas' },
      { id: '29', stateName: 'Tlaxcala' },
      { id: '30', stateName: 'Veracruz' },
      { id: '31', stateName: 'Yucatán' },
      { id: '32', stateName: 'Zacatecas' }
    ]
    this.years = ['2012','2013','2014','2015','2016','2017']
    this.sortModes = ['Ascendente','Descendente','Alfabéticamente']
  }

}
