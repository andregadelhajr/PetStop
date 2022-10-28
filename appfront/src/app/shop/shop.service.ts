import { IProduto } from 'src/app/shared/Models/produto';
import { ShopParams } from './../shared/models/shopParams';
import { delay, map } from 'rxjs/operators';
import { IMarca } from '../shared/models/marca';
import { ICategoria } from '../shared/models/categoria';
import { IPagination } from '../shared/Models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getProdutos(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.marcaId !== 0) {
      params = params.append('marcaId', shopParams.marcaId.toString());
    }

    if (shopParams.categoriaId !== 0) {
      params = params.append('categoriaId', shopParams.categoriaId.toString());
    }
    
    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('sort', shopParams.sort);
    params =  params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageIndex', shopParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'produtos', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
       })
    );
  }

  getProduto(id: number) {
    return this.http.get<IProduto>(this.baseUrl + 'produtos/' + id);
  }

  getMarcas(){
    return this.http.get<IMarca[]>(this.baseUrl + 'produtos/marcas')
  }

  getCategorias(){
    return this.http.get<ICategoria[]>(this.baseUrl + 'produtos/categorias')
  }
}
