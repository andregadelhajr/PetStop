import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProdutoItemComponent } from './produto-item/produto-item.component';
import { ProdutoDetalhesComponent } from './produto-detalhes/produto-detalhes.component';




@NgModule({
  declarations: [
    ShopComponent,
    ProdutoItemComponent,
    ProdutoDetalhesComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
