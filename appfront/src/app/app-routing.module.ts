import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TesteErrorComponent } from './core/teste-error/teste-error.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path: '', component:HomeComponent, data: {breadcrumb: 'Home'}},
  {path: 'teste-error', component:TesteErrorComponent, data: {breadcrumb: 'Test Errors'}},
  {path: 'server-error', component:ServerErrorComponent, data: {breadcrumb: 'Server Error'}},
  {path: 'not-found', component:NotFoundComponent, data: {breadcrumb: 'Not Found'}},
  {path: 'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule), data: {breadcrumb: 'produto'}},
  {path: 'cesta', loadChildren: () => import('./cesta/cesta.module').then(mod => mod.CestaModule), data: {breadcrumb: 'carrinho'}},
  {path: 'checkout', canActivate:[AuthGuard], loadChildren: () => import('./checkout/checkout.module').then(mod => mod.CheckoutModule), data: {breadcrumb: 'checkout'}},
  {path: 'produtos', loadChildren: () => import('./Lojistas/produtos/produtos.module').then(mod => mod.ProdutosModule), data: {breadcrumb: 'Adicionar produtos'}},
  {path: 'conta', loadChildren: () => import('./conta/conta.module').then(mod => mod.ContaModule), data: {breadcrumb: {skip: true}}},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
