import { Component } from '@angular/core';
import { PidType } from '../service/model';

@Component({
  selector: 'ngx-motor-pid',
  templateUrl: './motor-pid.component.html',
  styleUrls: ['./motor-pid.component.scss']
})
export class MotorPidComponent {
  
  PidType: typeof PidType = PidType;
  constructor() { }
}
