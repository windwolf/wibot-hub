import { MotorCommService } from './service/motor.comm.service';
import { SerialPortService } from './service/serial-port.service';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'ngx-motor-header',
  templateUrl: './motor.component.html',
  styleUrls: ['./motor.component.scss'],
})
export class MotorHeaderComponent {

  constructor(protected commService: MotorCommService) {

  }

  toggleConnection() {
    if (this.commService.connected) {
      this.commService.disconnect();
    }
    else {
      this.commService.connect();
    }
  }
}

@Component({
  selector: 'ngx-motor',
  template: `
  <router-outlet></router-outlet>`
})
export class MotorComponent {

  constructor() {

  }
}