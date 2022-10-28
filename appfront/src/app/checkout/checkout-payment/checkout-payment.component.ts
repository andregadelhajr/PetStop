import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CestaService } from 'src/app/cesta/cesta.service';
import { ICesta } from 'src/app/shared/models/cesta';
import { IOrder } from 'src/app/shared/models/order';
import { CheckoutRoutingService } from '../checkout-routing.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  constructor(private cestaService: CestaService, private checkoutService: CheckoutRoutingService, 
      private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  submitOrder() {
    const cesta = this.cestaService.getCurrentCestaValue();
    const orderToCreate = this.getOrderToCreate(cesta);
    this.checkoutService.createOrder(orderToCreate).subscribe((order: IOrder) => {
      this.toastr.success('Order created successfully');
      this.cestaService.deleteLocalCesta(cesta.id);
      const navigationExtras: NavigationExtras = {state: order};
      this.router.navigate(['checkout/success'], navigationExtras);
    }, error => {
      this.toastr.error(error.message);
      console.log(error);
    })
  }

  private getOrderToCreate(cesta: ICesta) {
    return {
      basketId: cesta.id,
      deliveryMethodId: +this.checkoutForm.get('deliveryForm').get('deliveryMethod').value,
      shipToAddress: this.checkoutForm.get('addressForm').value
    };
  }

}
