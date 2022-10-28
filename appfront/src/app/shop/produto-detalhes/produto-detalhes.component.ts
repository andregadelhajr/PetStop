import { CestaService } from 'src/app/cesta/cesta.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from './../shop.service';
import { Component, OnInit } from '@angular/core';
import { IProduto } from 'src/app/shared/Models/produto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produto-detalhes',
  templateUrl: './produto-detalhes.component.html',
  styleUrls: ['./produto-detalhes.component.scss']
})
export class ProdutoDetalhesComponent implements OnInit {
  produto: IProduto;
  quantidade = 1;

  constructor(private shopService: ShopService, private activeRoute: ActivatedRoute, 
    private bcService: BreadcrumbService, private cestaService: CestaService) 
  {
    this.bcService.set('@produtoDetalhes', '');
  }

  ngOnInit(): void {
    this.loadProduto();
  }

  addItemCesta() {
    this.cestaService.addItemToCesta(this.produto, this.quantidade);
  }

  incrementQuantidade() {
    this.quantidade++;
  }

  decrementQuantidade() {
    if (this.quantidade > 1) {
      this.quantidade--;
    }
  }

  loadProduto() {
    this.shopService.getProduto(+ this.activeRoute.snapshot.paramMap.get('id')).subscribe(produto => {
      this.produto = produto;
      this.bcService.set('@produtoDetalhes', produto.nome);
    }, error => {
      console.log(error);
    })
  }

}
