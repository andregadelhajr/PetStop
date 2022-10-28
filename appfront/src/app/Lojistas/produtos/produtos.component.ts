import { ProdutosService } from 'src/app/Lojistas/produtos/produtos.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IProduto } from 'src/app/shared/models/produto'; 

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  produtos$: Observable<IProduto>;

  constructor(private produtosService: ProdutosService) { }

  ngOnInit(): void {
    // this.produtos$ = this.produtosService.produtos$;
  }

}
