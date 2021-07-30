import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoneyRoutingModule } from './money-routing.module';
import { MoneyComponent } from './money.component';
import {HttpClientModule} from '@angular/common/http';
import { SeleccionComponent } from './seleccion/seleccion.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MoneyComponent,
    SeleccionComponent
  ],
  imports: [
    CommonModule,
    MoneyRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class MoneyModule { }
