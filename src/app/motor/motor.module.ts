import { NgModule } from '@angular/core';
import { NbAccordionModule, NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbListModule, NbMenuModule, NbRadioModule, NbRouteTabsetModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PidComponent } from './pid/pid/pid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MotorRoutingModule } from './motor-routing.module';
import { MonitorComponent } from './monitor/monitor.component';
import { PlaceholdComponent } from '../framework/placehold.component';
import { MotorPidComponent } from './pid/motor-pid.component';
import { MotorComponent, MotorHeaderComponent } from './motor.component';
import { ScopeComponent } from './monitor/scope/scope.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChannelComponent } from './monitor/scope/channel/channel.component';

@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NgxEchartsModule,
    FormsModule,
    ReactiveFormsModule,
    NbFormFieldModule,

    MotorRoutingModule,
  ],
  declarations: [
    PidComponent,
    MonitorComponent,
    PlaceholdComponent,
    MotorPidComponent,
    MotorComponent,
    ScopeComponent,
    ChannelComponent,
    MotorHeaderComponent,
  ],
})
export class MotorModule {
}
