import { CestaService } from 'src/app/cesta/cesta.service';
import { Component, Input, OnInit } from '@angular/core';
import { IProduto } from 'src/app/shared/models/produto';

@Component({
  selector: 'app-produto-item',
  templateUrl: './produto-item.component.html',
  styleUrls: ['./produto-item.component.scss']
})
export class ProdutoItemComponent implements OnInit {
  @Input() produto: IProduto;

  constructor(private cestaService: CestaService) { }

  ngOnInit(): void {
  }

  addItemToCesta() {
    this.cestaService.addItemToCesta(this.produto);
  }

}
