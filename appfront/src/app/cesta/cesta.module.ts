import { CestaRoutingModule } from './cesta-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CestaComponent } from './cesta.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CestaComponent
  ],
  imports: [
    CommonModule,
    CestaRoutingModule,
    SharedModule
  ]
})
export class CestaModule { }
