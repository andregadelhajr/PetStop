import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ICestaTotal } from '../../models/cesta';
import { CestaService } from 'src/app/cesta/cesta.service';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit {
  cestaTotal$: Observable<ICestaTotal>;

  constructor(private cestaService: CestaService) { }

  ngOnInit(): void {
    this.cestaTotal$ = this.cestaService.cestaTotal$;
  }

}
