import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CestaService } from 'src/app/cesta/cesta.service';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { CheckoutRoutingService } from '../checkout-routing.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  deliveryMethods: IDeliveryMethod[];

  constructor(private checkoutService: CheckoutRoutingService, private basketService: CestaService) { }

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe((dm: IDeliveryMethod[]) => {
      this.deliveryMethods = dm;
    }, error => {
      console.log(error);
    })
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.basketService.setShippingPrice(deliveryMethod);
  }

}
