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
  @Input() private winWidth: number;
  private width: number;
  private height: number;
  private margin: any = { top: 20, bottom: 20, left: 30, right: 20};
  private chart: any;
  private xScale: any;
  private yScale: any;
  private dataCont: Array<any>;
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
    console.log(this.width);
    
  }

  selectValues(option: number){
    this.dataCont = [];
    if(option === 0){
      for(let i = 0; i < this.data[this.selYear].idh.length; i++) {
        this.dataCont.push([
          this.data[this.selYear].idh[i][1],
          this.data[this.selYear].idh[i][2]
        ]);
      } 
      //console.log("Sin abrv");
      //console.log(this.dataCont);
      return this.dataCont;
    } else if(option === 1) {
        for(let i = 0; i < this.data[this.selYear].idh.length; i++) {
          this.dataCont.push([
            this.data[this.selYear].idh[i][0],
            this.data[this.selYear].idh[i][2]
          ]);
      }
      //console.log("Con abrv");
      //console.log(this.dataCont);
      return this.dataCont;
    }
  }

  createChart() {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', this.width >= 480 ? element.offsetHeight + 65 : element.offsetHeight + 85);

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.winWidth >= 480 ? this.margin.left : 390}, ${this.margin.bottom})`);
      //`translate(${this.margin.left}, ${this.margin.top})`

    // define X & Y domains
    const xDomain = this.winWidth >= 480 ? this.data[this.selYear].idh.map(d => d[1]) : this.data[this.selYear].idh.map(d => d[0]);
    //console.log(xDomain);
    
    const yDomain = [0, parseFloat(d3.max(this.data[this.selYear].idh, d => d[2]))];
    //console.log(yDomain);

    // create scales
    this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
    //console.log(this.xScale);
    
    this.yScale = d3.scaleLinear().domain(yDomain).rangeRound([this.height, 0]);
    //this.yScale = d3.scaleLinear().domain(yDomain).rangeRound([this.height, 0]);
    //console.log(this.yScale);
    

    // bar colors
    //this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);

    // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.winWidth >= 480 ? this.margin.top + this.height : this.margin.top})`)
      .call(d3.axisBottom(this.winWidth >= 480 ? this.xScale : this.yScale))
    .selectAll('text')
      .attr('y', 7)
      .attr('x', -5)
      .attr('dy', '.35em')
      .attr('transform', this.winWidth >= 480 ? 'rotate(-45)' : '')
      .style('text-anchor','end');
    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.winWidth >= 480 ? this.yScale : this.xScale));
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
      .data(this.winWidth >= 480 ? this.selectValues(0) : this.selectValues(1));

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
      .attr('height', d => this.height - this.yScale(d[1]))
      .attr('transform', this.winWidth >= 480 ? '' : 'rotate(90)');
      console.log(this.height);
      
  }

  selectSortMode() {
    switch (this.selSortMode) {
      case 'Ascendente':
        this.data[this.selYear].idh.sort(function(a, b){return a[2] > b[2] ? 1 : -1});
        break;

      case 'Descendente':
        this.data[this.selYear].idh.sort(function(a, b){return b[2] > a[2] ? 1 : -1});
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