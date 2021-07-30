import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'money',
    loadChildren: () => import('./money/money.module').then(m => m.MoneyModule)
  },
  {
    path: '',
    loadChildren: () => import('./lanzamientos/lanzamientos.module').then(m => m.LanzamientosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
