import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductHomeComponent } from './pages/product-home/product-home.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ProductHomeComponent,
    FilterBarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    HttpClientModule,
    SharedModule         
  ]
})
export class ProductsModule { }
