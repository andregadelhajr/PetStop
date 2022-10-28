import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProdutoDetalhesComponent } from './produto-detalhes/produto-detalhes.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component:ShopComponent},
  {path: ':id', component:ProdutoDetalhesComponent, data: {breadcrumb: {alias: 'produtoDetalhes'}}},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShopRoutingModule { }
