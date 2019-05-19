import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';
import { Calorias } from '../calorias';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.page.html',
  styleUrls: ['./graphics.page.scss'],
})
export class GraphicsPage implements AfterViewInit {

  @ViewChild('pieCanvas') pieCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  pieChart: any;
  lineChart: any;
  pesos:number[];
  calorico:Calorias[];

  constructor(private storage: Storage) { 
    this.storage.get('pesos').then( (result:number[]) => this.pesos = result );
    this.storage.get('calorico').then( (result:Calorias[]) => this.calorico = result );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.lineChart = this.getLineChart();
    }, 250);
    setTimeout(() => {
      this.pieChart = this.getPieChart();
    }, 350);
  }

  getChart(context, chartType, data, options?) {
    return new Chart(context, {
      data,
      options,
      type: chartType,
    });
  }

  getPieChart() {
    let grasas = 0;
    let hidratos = 0;
    let proteinas = 0;
    for(let i=0;i<this.calorico.length;i++) {
      grasas += this.calorico[i].grasas;
      hidratos += this.calorico[i].hidratos;
      proteinas += this.calorico[i].proteinas;
    }
    const data = {
      labels: ['Grasas', 'Proteinas', 'Hidratos'],
      datasets: [
        {
          data: [grasas, proteinas, hidratos],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    };
    return this.getChart(this.pieCanvas.nativeElement, 'pie', data);
  }

  getLineChart() {
    let noviembre = 0;
    let diciembre = 0;
    let enero = 0;
    let febrero = 0;
    let marzo = 0;
    let abril = 0;
    let mayo = 0;
    let min: number;
    let max: number;
    const meses = ['Noviembre', 'Diciembre', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'];
    for(let i=0;i<meses.length;i++) {
      switch (meses[i]) {
        case 'Noviembre': { //0-29
          min = 0;
          max = 29;
          break;
        }
        case 'Diciembre': { //30-60
          min = 30;
          max = 60;
          break; 
        }
        case 'Enero': { //61-91
          min = 61;
          max = 91;
          break;
        }
        case 'Febrero': { //92-119
          min = 92;
          max = 119;
          break; 
        } 
        case 'Marzo': { //120-150
          min = 120;
          max = 150;
          break;
        }
        case 'Abril': { //151-180
          min = 151;
          max = 180;
          break;
        }
        default: { //181-211
          min = 181;
          max = 211;
          break;
        }
      }
      for(let j=min;j<=max;j++) {
        if(min == 0) {
          noviembre += this.pesos[j];
        } else if (min == 30) {
          diciembre += this.pesos[j];
        } else if (min == 61) {
          enero += this.pesos[j];
        } else if (min == 92) {
          febrero += this.pesos[j];
        } else if (min == 120) {
          marzo += this.pesos[j];
        } else if (min == 151) {
          abril += this.pesos[j];
        } else {
          mayo += this.pesos[j];
        }
      }
    }
    noviembre = noviembre/30.0;
    noviembre = parseFloat(noviembre.toFixed(1));
    diciembre = diciembre/31.0;
    diciembre = parseFloat(diciembre.toFixed(1));
    enero = enero/31.0;
    enero = parseFloat(enero.toFixed(1));
    febrero = febrero/28.0;
    febrero = parseFloat(febrero.toFixed(1));
    marzo = marzo/31.0;
    marzo = parseFloat(marzo.toFixed(1));
    abril = abril/30.0;
    abril = parseFloat(abril.toFixed(1));
    mayo = mayo/31.0;
    mayo = parseFloat(mayo.toFixed(1));

    const pesos2 = [noviembre, diciembre, enero, febrero, marzo, abril, mayo];
    const data = {
      labels: meses,
      datasets: [
        {
          label: 'Peso',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: pesos2,
          spanGaps: false,
        }/*,
        {
          label: 'My Second dataset',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(175,92,192,0.4)',
          borderColor: 'rgba(31,156,156,1)',
          borderCapStyle: 'butt',
          borderDash: [5, 8],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(31,156,156,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(31,156,156,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [15, 39, 50, 81, 51, 55, 30],
          spanGaps: false,
        }*/
      ]
    };
    return this.getChart(this.lineCanvas.nativeElement, 'line', data);
  }
}

