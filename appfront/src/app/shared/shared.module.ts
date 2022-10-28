import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'node_modules/ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { CarouselModule } from 'node_modules/ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './components/text-input/text-input.component';
import { CdkStepperModule } from "@angular/cdk/stepper";
import { StepperComponent } from './components/stepper/stepper.component';
import { CestaSummaryComponent } from './components/cesta-summary/cesta-summary.component'


@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalsComponent,
    TextInputComponent,
    StepperComponent,
    CestaSummaryComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    CdkStepperModule,
    RouterModule,
  ],
  exports: [PaginationModule, BsDropdownModule, PagingHeaderComponent, PagerComponent, OrderTotalsComponent, ReactiveFormsModule, TextInputComponent, CdkStepperModule, StepperComponent, CestaSummaryComponent]
})
export class SharedModule { }
