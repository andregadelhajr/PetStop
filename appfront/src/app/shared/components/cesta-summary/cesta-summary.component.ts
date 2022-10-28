import { ICesta, ICestaItem  } from '../../models/cesta';
import { Observable } from 'rxjs';
import { CestaService } from 'src/app/cesta/cesta.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-cesta-summary',
  templateUrl: './cesta-summary.component.html',
  styleUrls: ['./cesta-summary.component.scss']
})
export class CestaSummaryComponent implements OnInit {
  cesta$: Observable<ICesta>;
  @Output() decrement: EventEmitter<ICestaItem> = new EventEmitter<ICestaItem>();
  @Output() increment: EventEmitter<ICestaItem> = new EventEmitter<ICestaItem>();
  @Output() remove: EventEmitter<ICestaItem> = new EventEmitter<ICestaItem>();
  @Input() isCesta = true;

  constructor(private cestaService: CestaService) { }

  ngOnInit(): void {
    this.cesta$ = this.cestaService.cesta$;
  }

  decrementItemQuantidade(item: ICestaItem) {
    this.decrement.emit(item);
  }

  incrementItemQuantidade(item: ICestaItem) {
    this.increment.emit(item);
  }

  removeItemCesta(item: ICestaItem) {
    this.remove.emit(item);
  }

}



