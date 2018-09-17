import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { MinBarChartComponent } from './min-bar-chart/min-bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BarChartComponent,
    MinBarChartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
