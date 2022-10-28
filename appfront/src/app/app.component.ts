import { CestaService } from './cesta/cesta.service';
import { Component, OnInit } from '@angular/core';
import { ContaService } from './conta/conta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'A&A e-commerce';

  constructor(private cestaService: CestaService, private contaService: ContaService) { }

  ngOnInit(): void {
    this.loadCarrinho();
    this.loadCurrentUser();
  }

  loadCarrinho(): void {
    const cestaId = localStorage.getItem('cesta_id');
    if (cestaId) {
      this.cestaService.getCesta(cestaId).subscribe(() => {
        console.log('inicializando cesta');
      }, error => {
        console.log(error);
      });
    }

  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.contaService.loadCurrentUser(token).subscribe(() => {
      console.log('inicializando user');
    }, error => {
      console.log(error);
    })
  }

}
