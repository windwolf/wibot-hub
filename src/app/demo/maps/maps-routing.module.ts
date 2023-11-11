import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapsComponent } from './maps.component';
import { LeafletComponent } from './leaflet/leaflet.component';
import { BubbleMapComponent } from './bubble/bubble-map.component';
import { SearchMapComponent } from './search-map/search-map.component';
import { MapComponent } from './search-map/map/map.component';
import { SearchComponent } from './search-map/search/search.component';

const routes: Routes = [{
  path: '',
  component: MapsComponent,
  children: [{
    path: 'leaflet',
    component: LeafletComponent,
  }, {
    path: 'bubble',
    component: BubbleMapComponent,
  }, {
    path: 'searchmap',
    component: SearchMapComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsRoutingModule { }

export const routedComponents = [
  MapsComponent,
  LeafletComponent,
  BubbleMapComponent,
  SearchMapComponent,
  MapComponent,
  SearchComponent,
];
