import { Cesta, ICestaItem, ICestaTotal } from '../shared/models/cesta';
import { IProduto } from 'src/app/shared/Models/produto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src//environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ICesta } from '../shared/models/cesta';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class CestaService {
  baseUrl = environment.apiUrl;
  private cestaSource = new BehaviorSubject<ICesta>(null);
  cesta$ = this.cestaSource.asObservable();
  private cestaTotalSource = new BehaviorSubject<ICestaTotal>(null);
  cestaTotal$ = this.cestaTotalSource.asObservable();
  entrega = 0;

  constructor(private http: HttpClient) { }

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.entrega = deliveryMethod.price;
    this.calculateTotals();
  }

  getCesta(id: string) {
    return this.http.get(this.baseUrl + 'cesta?id=' + id)
      .pipe(
        map((cesta: ICesta) => {
          this.cestaSource.next(cesta);
          this.calculateTotals();
        })
      );
  }

  setCesta(cesta: ICesta) {
    return this.http.post(this.baseUrl + 'cesta', cesta).subscribe((response: ICesta) => {
      this.cestaSource.next(response);
      this.calculateTotals();
    }, error => {
      console.log(error);
    });
  }

  getCurrentCestaValue() {
    return this.cestaSource.value;
  }

  addItemToCesta(item: IProduto, quantidade = 1) {
    const itemToAdd: ICestaItem = this.mapProdutoItemToCestaItem(item, quantidade);
    const cesta = this.getCurrentCestaValue() ?? this.createCesta();
    cesta.items = this.addOrUpdateItem(cesta.items, itemToAdd, quantidade);
    this.setCesta(cesta);
  }

  incrementItemQuantidade(item: ICestaItem) {
    const cesta = this.getCurrentCestaValue();
    const foundItemIndex = cesta.items.findIndex(x => x.id === item.id);
    cesta.items[foundItemIndex].quantidade++;
    this.setCesta(cesta);
  }

  decrementItemQuantidade(item: ICestaItem) {
    const cesta = this.getCurrentCestaValue();
    const foundItemIndex = cesta.items.findIndex(x => x.id === item.id);
    if (cesta.items[foundItemIndex].quantidade > 1){
      cesta.items[foundItemIndex].quantidade--;
      this.setCesta(cesta);
    } else {
      this.removeItemCesta(item);
    }
  }
  
  removeItemCesta(item: ICestaItem) {
    const cesta = this.getCurrentCestaValue(); 
    if (cesta.items.some(x => x.id === item.id)) {
      cesta.items = cesta.items.filter(i => i.id !== item.id);
      if (cesta.items.length > 0) {
        this.setCesta(cesta);
      } else {
        this.deleteCesta(cesta);
      }
    }
  }

  deleteLocalCesta(id: string) {
    this.cestaSource.next(null);
    this.cestaTotalSource.next(null);
    localStorage.removeItem('cesta_id');
  }

  deleteCesta(cesta: ICesta) {
    return this.http.delete(this.baseUrl + 'cesta?id=' + cesta.id).subscribe(() => {
      this.cestaSource.next(null);
      this.cestaTotalSource.next(null);
      localStorage.removeItem('cesta_id');
    }, error => {
      console.log(error);
    });
  }

  private calculateTotals() {
    const cesta = this.getCurrentCestaValue();
    const entrega = this.entrega;
    const subtotal = cesta.items.reduce((a, b) => (b.preco * b.quantidade) + a, 0);
    const total = subtotal + entrega;
    this.cestaTotalSource.next({entrega, total, subtotal});
  }

  private addOrUpdateItem(items: ICestaItem[], itemToAdd: ICestaItem, quantidade: number): ICestaItem[] {
    console.log(items);
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantidade = quantidade;
      items.push(itemToAdd);
    } else {
      items[index].quantidade += quantidade;
    }

    return items;
  }

  private createCesta(): ICesta {
    const cesta = new Cesta();
    localStorage.setItem('cesta_id', cesta.id);
    return cesta;
  }

  private mapProdutoItemToCestaItem(item: IProduto, quantidade: number): ICestaItem {
    return {
      id: item.id,
      produtoNome: item.nome,
      preco: item.preco,
      imgUrl: item.imgUrl,
      quantidade,
      categoria: item.produtoCategoria,
      marca: item.produtoMarca
    };
  }
}
