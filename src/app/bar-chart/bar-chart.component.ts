import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { svg } from 'd3';
import { SelectControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BarChartComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  @Input() selState: string;
  @Input() selYear: number;
  @Input() selSortMode: string;
  @Input() private width: number;
  private margin: any = { top: 20, bottom: 20, left: 30, right: 20};
  private chart: any;
  private height: number;
  private xScale: any;
  private yScale: any;
  private xAxis: any;
  private yAxis: any;
  private colors: any;
  
  constructor() {
    this.selState = "";
    this.selYear = 0;
    this.selSortMode = 'Alfabéticamente';
   }
  
  ngOnInit() {
    this.createChart();
    if (this.data) {
      this.selectSortMode();
      this.updateChart();
    }
  }

  ngOnChanges() {
    if (this.chart) {
      this.selectSortMode();
      this.updateChart();
    }
  }

  setColor(){
    
  }

  createChart() {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight + 65);

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // define X & Y domains
    const xDomain = this.data[this.selYear].idh.map(d => d[0]);
    console.log(xDomain);
    
    const yDomain = [0, d3.max(this.data[this.selYear].idh, d => d[1])];
    console.log(yDomain);

    // create scales
    this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

    // bar colors
    //this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);

    // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale))
    .selectAll('text')
      .attr('y', 7)
      .attr('x', -5)
      .attr('dy', '.35em')
      .attr('transform', this.width >= 480 ? 'rotate(-45)' : '')
      .style('text-anchor','end');
    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale));
  }

  updateChart() {
    //Remueve la gráfica creada con anterioridad
    d3.select('svg').remove();
    //Vuelve a dibujar la gráfica con los datos actualizados
    this.createChart();
    // update scales & axis
    //this.xScale.domain(this.data[this.selYear].idh.map(d => d[0]));
    //this.yScale.domain([0, d3.max(this.data[this.selYear].idh, d => d[1])]);
    //this.xAxis.transition().call(d3.axisBottom(this.xScale));
    //this.yAxis.transition().call(d3.axisLeft(this.yScale));

    const update = this.chart.selectAll('.bar')
      .data(this.data[this.selYear].idh);

    // remove exiting bars
    update.exit().remove();

    // update existing bars
    //this.chart.selectAll('.bar').transition()
      //.attr('x', d => this.xScale(d[0]))
      //.attr('y', d => this.yScale(d[1]))
      //.attr('width', d => this.xScale.bandwidth())
      //.attr('height', d => this.height - this.yScale(d[1]))
      //.attr('transform','rotate(90)')
      //.style('fill', 'blue');

    // add new bars
    update
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(0))
      .attr('width', this.xScale.bandwidth())
      .attr('height', 0)
      .style('fill', 'orange')
      //.transition()
      //.delay((d, i) => i * 10)
      .attr('y', d => this.yScale(d[1]))
      .attr('height', d => this.height - this.yScale(d[1]));
      //.attr('transform','rotate(-90)');
  }

  selectSortMode() {
    switch (this.selSortMode) {
      case 'Ascendente':
        this.data[this.selYear].idh.sort(function(a, b){return a[1] > b[1] ? 1 : -1});
        break;

      case 'Descendente':
        this.data[this.selYear].idh.sort(function(a, b){return b[1] > a[1] ? 1 : -1});
        break;

      case 'Alfabéticamente':
        this.data[this.selYear].idh.sort();
        break;

      default:
        //Alfabéticamente
        this.data[this.selYear].idh.sort();
        break;
    }
  }
}