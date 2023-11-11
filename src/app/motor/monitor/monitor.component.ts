import { Component } from '@angular/core';
import { ChannelInfo } from './scope/scope.component';

@Component({
  selector: 'ngx-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent {
  data: number[][] = [];
  channels: ChannelInfo[] = [];
  channels_: ChannelInfo[] = [];

  constructor() {
    this.data = [[1, 1, 1], [2, 1, 2], [4, 1, 3], [7, 1, 4], [8, 1, 5]];
    this.channels_ = [
      { name: "ch1", index: 1, color: "red", enable: true },
      { name: "ch2", index: 2, color: "blue", enable: true }
    ];
    this.channels = this.channels_;

  }

  updateChannels() {
    this.channels = this.channels_.map((ch) => ch);
  }
}
