import { delay, takeWhile } from 'rxjs/operators';
import { AfterViewInit, Component, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { LayoutService } from '../../../@core/utils';
import { ECharts, graphic } from 'echarts';

@Component({
  selector: 'ngx-traffic-chart',
  template: `
    <div echarts
         [options]="option"
         class="echart"
         (chartInit)="onChartInit($event)">
    </div>
  `,
})
export class TrafficChartComponent implements AfterViewInit, OnChanges, OnDestroy {

  private alive = true;

  @Input() points: number[][];

  type = 'month';
  types = ['week', 'month', 'year'];
  option: any = {};
  echartsIntance: ECharts;

  constructor(private theme: NbThemeService,
    private layoutService: LayoutService) {
    this.layoutService.onSafeChangeLayoutSize()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe(() => this.resizeChart());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.points && !changes.points.isFirstChange() && this.echartsIntance) {
      this.echartsIntance.setOption({
        dataset: {
          source: this.points,
        },
      });
    }
  }

  ngAfterViewInit() {
    this.theme.getJsTheme()
      .pipe(
        delay(1),
        takeWhile(() => this.alive),
      )
      .subscribe(config => {
        const trafficTheme: any = config.variables.traffic;

        this.option = Object.assign({}, {
          legend: {},
          grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            //data: this.points,
          },
          yAxis: {
            boundaryGap: [0, '5%'],
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: trafficTheme.yAxisSplitLine,
                width: '1',
              },
            },
          },
          dataset: {
            sourceHeader: false,
            source: this.points,

          },
          series: [
            {
              type: 'line',
              symbol: 'none',
              symbolSize: 0,
              sampling: 'average',
              silent: true,
              animation: false,
              lineStyle: {
                width: 1,

              },
              demensions: [
                { name: "ch1", type: "number" },
                { name: "ch2", type: "number" },
              ],
            },
            // {
            //   type: 'line',
            //   symbol: 'none',
            //   symbolSize: 0,
            //   sampling: 'average',
            //   silent: true,
            //   animation: false,
            //   lineStyle: {
            //     width: 1,
            //   },
            //   demensions: [
            //     { name: "ch2", type: "number" },
            //   ],
            // },
          ],
        });
      });
  }

  onChartInit(echarts) {
    this.echartsIntance = echarts;
  }

  resizeChart() {
    if (this.echartsIntance) {
      this.echartsIntance.resize();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
