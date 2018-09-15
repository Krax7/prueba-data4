import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as D3 from 'd3';

export type Datum = {name: string, value: number};
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnChanges {
  @Input() height = 300;
  @Input() width = 600;
  @Input() data: Datum[] = [];
  @Input() range = 100;

  xScale: D3.ScaleBand<string> = null;
  yScale: D3.ScaleLinear<number, number> = null;
  transform = '';
  chartWidth = this.width;
  chartHeight = this.height;
  barHeights: number[] = [];
  barWidth = 0;
  xCoordinates: number[] = [];

  // Input changed, recalculate using D3
  ngOnChanges() {
    this.chartHeight = this.height;
    this.chartWidth = this.width;
    this.xScale = D3.scaleBand()
      .domain(this.data.map((item: Datum)=>item.name)).range([0, this.chartWidth])
      .paddingInner(0.5);
    this.yScale = D3.scaleLinear()
      .domain([0, this.range])
      .range([this.chartHeight, 0]);

    this.barWidth = this.xScale.bandwidth();
    this.barHeights = this.data.map((item: Datum) =>this.barHeight(item.value));
    this.xCoordinates = this.data.map((item: Datum) => this.xScale(item.name));
    
    // use transform to flip the chart upside down, so the bars start from bottom
    this.transform = `scale(1, -1) translate(0, ${- this.chartHeight})`;
  }

  clampHeight(value: number) {
    if (value < 0) {
      return 0;
    }
    if (this.chartHeight <= 0) {
      return 0
    }
    if (value > this.chartHeight) {
      return this.chartHeight;
    }
    return value;
  }

  barHeight(value) {
    return this.clampHeight(this.chartHeight - this.yScale(value));
  }

  constructor() { }

  ngOnInit() {
  }

}
