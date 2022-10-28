import { CestaService } from 'src/app/cesta/cesta.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ICesta, ICestaItem } from '../shared/models/cesta';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.scss']
})
export class CestaComponent implements OnInit {
  cesta$: Observable<ICesta>;

  constructor(private cestaService: CestaService) { }

  ngOnInit(): void {
    this.cesta$ = this.cestaService.cesta$;
  }

  removeItemCesta(item: ICestaItem) {
    this.cestaService.removeItemCesta(item);
  }

  incrementItemQuantidade(item: ICestaItem) {
    this.cestaService.incrementItemQuantidade(item);
  }

  decrementItemQuantidade(item: ICestaItem) {
    this.cestaService.decrementItemQuantidade(item);
  }

}
