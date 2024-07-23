import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CajeroPageRoutingModule } from './cajero-routing.module';

import { CajeroPage } from './cajero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CajeroPageRoutingModule
  ],
  declarations: [CajeroPage]
})
export class CajeroPageModule {}
