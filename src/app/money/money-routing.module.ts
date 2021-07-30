import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoneyComponent } from './money.component';
import { SeleccionComponent } from './seleccion/seleccion.component';

const routes: Routes = [
  {
    path: 'otro',
    component: MoneyComponent
  },
  {
    path: '',
    component:SeleccionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoneyRoutingModule { }
