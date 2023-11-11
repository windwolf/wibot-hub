import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from '../demo/dashboard/dashboard.component';
import { ECommerceComponent } from '../demo/e-commerce/e-commerce.component';
import { NotFoundComponent } from '../demo/miscellaneous/not-found/not-found.component';
import { PidComponent } from '../motor/pid/pid/pid.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'motor',
      loadChildren: () => import('../motor/motor.module')
        .then(m => m.MotorModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
