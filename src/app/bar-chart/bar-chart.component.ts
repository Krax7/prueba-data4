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
  @ViewChild('chart') private chartContainer: ElementRef; // Obtener acceso a una instancia específica
  @Input() private data: Array<any>; // Input para el dataset
  @Input() selState: string; // Input para el estado seleccionado
  @Input() selYear: number; // Input para el año seleccionado
  @Input() selSortMode: string; // Input para el tipo de ordenamiento seleccionado
  @Input() private winWidth: number; // Input para el tamaño actual de la pantalla
  private width: number; // Variable para el ancho del svg
  private height: number; // Variable para la altura del svg
  private margin: any = { top: 20, bottom: 20, left: 30, right: 20}; // Márgenes interiores
  private chart: any; // Variable para contener el objeto chart
  private xScale: any; // Variable para contener la escala mostrada en el eje x
  private yScale: any; // Variable para contener la escala mostrada en el eje y
  private dataCont: Array<any>; // Arreglo para contener únicamente la información a graficar
  private xAxis: any; // Variable para definir las propiedades del eje x
  private yAxis: any; // Variable para definir las propiedades del eje y
  
  constructor() { // Inicializa las variables de control de la gráfica
    this.selState = 'Aguascalientes';
    this.selYear = 0;
    this.selSortMode = 'Alfabéticamente';
   }
  
  ngOnInit() {
    this.createChart(); // Creamos la gŕafica por primera vez
    if (this.data) { // Verifica si el dataset ya se encuentra disponible
      this.selectSortMode(); // Modo de ordenamiento para los datos a graficar
      this.updateChart(); // Actualizar la gráfica añadiendo las barras
    }
  }

  ngOnChanges() {
    if (this.chart) { // Si la gráfica ya se encuentra dibujada
      this.selectSortMode(); // Llama al método de ordenamiento para conservar u ordenar nuevamente
                             // los datos al redibujar la gráfica
      this.updateChart(); // Actualizar la gŕafica
    }
  }

  selectValues(option: number){ // Permite filtrar el dataset con los nombres completos de los 
                                // estados o únicamente con sus abreviaciones
    this.dataCont = []; // Contenedor del dataset filtrado
    // option: 0 --> conservar nombres completos | 1 --> conservar abbreviaturas
    // Formato de cada array a filtrar: [nombre_estado_abv, nombre_estado_completo, IDH]
    if(option === 0){
      for(let i = 0; i < this.data[this.selYear].idh.length; i++) {
        this.dataCont.push([
          this.data[this.selYear].idh[i][1],
          this.data[this.selYear].idh[i][2],
          // Si el nombre del estado coincide con el estado que se ha seleccionado, agrega un true
          this.data[this.selYear].idh[i][1] === this.selState ? true : false
        ]);
      } 
      return this.dataCont;
    } else if(option === 1) {
        for(let i = 0; i < this.data[this.selYear].idh.length; i++) {
          this.dataCont.push([
            this.data[this.selYear].idh[i][0],
            this.data[this.selYear].idh[i][2],
            // Si el nombre del estado coincide con el estado que se ha seleccionado, agrega un true
            this.data[this.selYear].idh[i][0] === this.selState ? true : false
          ]);
      }
      return this.dataCont;
    }
  }

  selectSortMode() { // Función de ordenamiento de los datos
    switch (this.selSortMode) {
      case 'Ascendente': // Ordenar IDH del menor al mayor
        this.data[this.selYear].idh.sort(function(a, b){return a[2] > b[2] ? 1 : -1});
        break;

      case 'Descendente': // Ordenar IDH del mayor al menor
        this.data[this.selYear].idh.sort(function(a, b){return b[2] > a[2] ? 1 : -1});
        break;

      case 'Alfabéticamente': // Ordenar alfabéticamente los nombres de estados
        this.data[this.selYear].idh.sort();
        break;

      default: // Alfabéticamente por defecto
        this.data[this.selYear].idh.sort();
        break;
    }
  }

  createChart() { // Crear gráfica
    const element = this.chartContainer.nativeElement; // Obtener elemento del DOM
    this.width = element.offsetWidth - this.margin.left - this.margin.right; // Ancho del svg
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom; // Altura del svg
    const svg = d3.select(element).append('svg') // Añadir elemento svg
      .attr('width', element.offsetWidth) // Establecer ancho del elemento
      // Se realizan ajustes para visualizar los nombres de estados que se salen del contenedor
      // por su longitud.
      .attr('height', this.width >= 480 ? element.offsetHeight + 65 : element.offsetHeight + 85);

    // Área para colocar las barras de la gráfica
    this.chart = svg.append('g')
      .attr('class', 'bars')
      // Los valores de traslación de las barras cambian al colocarse horizontalmente
      .attr('transform', `translate(${this.winWidth >= 480 ? this.margin.left : 390}, ${this.margin.bottom})`);

    // Definir los dominios de X e Y
    // En el tamaño de pantalla para móviles, los nombres de los estados se muestran abreviados.
    const xDomain = this.winWidth >= 480 ? this.data[this.selYear].idh.map(d => d[1]) : this.data[this.selYear].idh.map(d => d[0]);
    // Se obtiene el valor más alto de los IDH como máximo para el dominio de Y
    const yDomain = [0, parseFloat(d3.max(this.data[this.selYear].idh, d => d[2]))];

    // Crear las escalas
    // Se establece es espaciado entre nombres para la escala X y sus dimensiones
    this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
    // En el tamaño de pantalla para móviles, la condicional permite que la escala se despliege de 0 a IDHmax correctamente
    this.yScale = d3.scaleLinear().domain(yDomain).rangeRound(this.winWidth >= 480 ? [this.height, 0] : [0, this.height]);

    // Ejes X e Y
    this.xAxis = svg.append('g') // Dibujar eje X
      .attr('class', 'axis axis-x')
      // Traslado del eje X según dimensiones de la pantalla
      .attr('transform', `translate(${this.margin.left}, ${this.winWidth >= 480 ? this.margin.top + this.height : this.margin.top})`)
      // Mostrar escala del eje X en vista normal. Mostrar escala del eje Y en vista para móvil.
      .call(d3.axisBottom(this.winWidth >= 480 ? this.xScale : this.yScale))
    .selectAll('text')
      .attr('y', 7) // Coordenadas para colocar los nombres de los estados de forma alineada
      .attr('x', -5)
      .attr('dy', '.35em')
      .attr('transform', this.winWidth >= 480 ? 'rotate(-45)' : '') // Rota el nombre del estado para evitar traslape
      .style('text-anchor','end');
    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`) // Alineamiento del eje Y
      // Mostrar escala del eje Y en vista normal. Mostrar escala del eje X en vista para móvil.
      .call(d3.axisLeft(this.winWidth >= 480 ? this.yScale : this.xScale));
  }

  updateChart() {
    //Remueve la gráfica creada con anterioridad
    d3.select('svg').remove();
    //Vuelve a dibujar la gráfica con los datos actualizados
    this.createChart();

    // Actualizar todos los elementos bar
    const update = this.chart.selectAll('.bar')
      // Se enlaza el dataset correspondiente. | Se asigna un ID al elemento bar (nombre del estado).
      .data(this.winWidth >= 480 ? this.selectValues(0) : this.selectValues(1), function(d) { return d[2] });
    
    // Dibujar las barras
    update
      .enter()
      .append('rect')
      .attr('class', 'bar')
      // Dimensiones y correspondencia de las barras con la escala del eje X
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(0))
      .attr('width', this.xScale.bandwidth())
      .attr('height', 0)
      // Asigna un color distinto si se encontró un true en el registro (estado seleccionado)
      .style('fill', function(d) { if(d[2]) return 'red' ; 
                                    else return 'orange';})
      .transition()
      .delay((d, i) => i * 10)
      .attr('y', d => this.yScale(d[1]))
      .attr('height', d => this.height - this.yScale(d[1]))
      // En vista para móviles, las barras se rotan 90 grados
      .attr('transform', this.winWidth >= 480 ? '' : 'rotate(90)');
    // Remover barras sin datos
    update.exit().remove();
  }
}