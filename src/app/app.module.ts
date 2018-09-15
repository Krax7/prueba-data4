import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GraficaidhComponent } from './graficaidh/graficaidh.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ActionComponent } from './action/action.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GraficaidhComponent,
    DropdownComponent,
    ActionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
