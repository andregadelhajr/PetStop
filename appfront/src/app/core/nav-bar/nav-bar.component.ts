import { ContaService } from './../../conta/conta.service';
import { CestaService } from 'src/app/cesta/cesta.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ICesta } from 'src/app/shared/models/cesta';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  cesta$: Observable<ICesta>;
  currentUser$: Observable<IUser>;

  constructor(private cestaService: CestaService, private contaService: ContaService) { }

  ngOnInit(): void {
    this.cesta$ = this.cestaService.cesta$;
    this.currentUser$ = this.contaService.currentUser$;
  }

  logout() {
    this.contaService.logout();
  }

}
