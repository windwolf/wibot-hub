import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MotorComponent, MotorHeaderComponent } from './motor.component';
import { MotorPidComponent } from './pid/motor-pid.component';
import { MonitorComponent } from './monitor/monitor.component';


const routes: Routes = [
  {
    path: '',
    component: MotorHeaderComponent,
    outlet: "header-ext",
  },

  {
    path: '',
    component: MotorComponent,
    children: [
      {
        path: 'pid',
        component: MotorPidComponent,
      },
      {
        path: 'monitor',
        component: MonitorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotorRoutingModule {
}
