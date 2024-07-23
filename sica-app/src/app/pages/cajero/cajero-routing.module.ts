import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CajeroPage } from './cajero.page';

const routes: Routes = [
  {
    path: '',
    component: CajeroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CajeroPageRoutingModule {}
