import { ShopParams } from './../shared/models/shopParams';
import { IMarca } from './../shared/models/marca';
import { ICategoria } from './../shared/models/categoria';
import { IProduto } from '../shared/Models/produto';
import { ShopService } from './shop.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  produtos : IProduto[];
  categorias: ICategoria[];
  marcas: IMarca[];
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    {nome: 'Ordem alfabética', value: 'name'},
    {nome: 'Preço: menor a maior', value: 'priceAsc'},
    {nome: 'Preço: maior a menor', value: 'priceDesc'},
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProdutos();
    this.getCategorias();
    this.getMarcas();
  }
  
  getProdutos() {
    this.shopService.getProdutos(this.shopParams).subscribe(response => {
      this.produtos = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  getMarcas(){
    this.shopService.getMarcas().subscribe(response => {
      this.marcas = [{id: 0, nome: 'Todas'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  getCategorias(){
    this.shopService.getCategorias().subscribe(response => {
      this.categorias = [{id: 0, nome: 'Todas'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  marcaSelected(marcaId: number){
    this.shopParams.marcaId = marcaId;
    this.shopParams.pageNumber = 1;
    this.getProdutos();
  }

  categoriaSelected(categoriaId: number){
    this.shopParams.categoriaId = categoriaId;
    this.shopParams.pageNumber = 1;
    this.getProdutos();
  }

  sortSelec(sort: string){
    this.shopParams.sort = sort;
    this.getProdutos();
  }

  pageChanged(event: any){
    if(this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event;
      this.getProdutos();
    }
    
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProdutos();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProdutos();
  }
}
