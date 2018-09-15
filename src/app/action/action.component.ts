import { Component, OnInit, Input, Directive } from '@angular/core';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
  @Input() actionCondition;
  constructor() { }

  ngOnInit() {
  }

}
