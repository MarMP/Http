import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanzamientosRoutingModule } from './lanzamientos-routing.module';
import { LanzamientosComponent } from './lanzamientos.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    LanzamientosComponent
  ],
  imports: [
    CommonModule,
    LanzamientosRoutingModule,
    HttpClientModule
  ]
})
export class LanzamientosModule { }
