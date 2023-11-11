import { Component, Input, SimpleChanges, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ECharts } from 'echarts';
import { delay, takeWhile } from 'rxjs/operators';
import { LayoutService } from '../../../@core/utils';

export interface ChannelInfo {
  index: number;
  name: string;
  color: string;
  enable: boolean;
}

@Component({
  selector: 'ngx-scope',
  templateUrl: './scope.component.html',
  styleUrls: ['./scope.component.scss']
})
export class ScopeComponent implements AfterViewInit, OnChanges, OnDestroy {
  private alive = true;
  options: any;
  echartsIntance: ECharts;

  @Input() channels: ChannelInfo[];
  @Input() data: number[][];
  @Input() yRange: number[];

  constructor(private theme: NbThemeService,
    private layoutService: LayoutService) {
    this.layoutService.onSafeChangeLayoutSize()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe(() => this.resizeChart());
    this.options = this.initOption();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.echartsIntance) {
      let changed = false;
      let opt = {};

      if (changes.data) {
        changed = true;
        this.changeData(opt);
      }
      if (changes.channels) {
        changed = true;
        this.changeChannels(opt);
      }
      if (changed) {
        Object.assign(this.options, opt);
        this.echartsIntance.setOption(opt);
      }
    }
  }

  initOption(): any {
    return Object.assign({}, {
      legend: {
        selectedMode: false,
      },
      tooltip: {},
      dataZoom: [
        {
          type: "slider",
          show: true,
          xAxisIndex: [0],
        },
        {
          type: "inside",
          xAxisIndex: [0],
        }
      ],
      grid: {
        left: 40,
        top: 10,
        right: 10,
        bottom: 40
      },
      xAxis: {
        type: 'time',
        axisLabel: {
          show: true,
          formatter: function (value, index) {
            return (value / 1000.0).toString();
          }
        },
        axisLine: {
          show: true,
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 0.5,
          },
        },
      },
      yAxis: {
        boundaryGap: [0, '5%'],
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: true,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 0.5,
          },
        },
      },
      dataset: {
        sourceHeader: false,
        source: [],
      },
    });
  }

  changeChannels(option) {
    const series = [];
    const legendSelected = {};
    if (this.channels) {
      this.channels.forEach(ch => {
        series.push({
          type: 'line',
          name: ch.name,
          showSymbol: false,
          color: ch.color,
          symbol: 'none',
          symbolSize: 0,
          sampling: 'average',
          silent: true,
          animation: false,
          lineStyle: {
            width: 0.3,
          },
          encode: {
            x: 0, y: ch.index,
          }
        });

        legendSelected[ch.name] = ch.enable;
      });
    }

    Object.assign(option, {

      dataset: {
        source: this.data,
      },
      series: series,
      legend: {
        selected: legendSelected,
      }
    });
  }

  changeData(option) {
    Object.assign(option, {
      dataset: {
        source: this.data,
      }
    })
  }

  ngAfterViewInit() {
    this.theme.getJsTheme()
      .pipe(
        delay(1),
        takeWhile(() => this.alive),
      )
      .subscribe(config => {

      });

    // let opt = {};
    // this.changeChannels(opt);
    // Object.assign(this.options, opt);
    // this.echartsIntance.setOption(opt);
  }

  onChartInit(echarts) {
    this.echartsIntance = echarts;
    let opt = {};
    this.changeData(opt);
    this.changeChannels(opt);
    Object.assign(this.options, opt);
    // this.echartsIntance.setOption(opt);
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
