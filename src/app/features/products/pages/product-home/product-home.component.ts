import { Component } from '@angular/core';
import { ProductsStore } from '../../state/products.stor.service';
import { Router } from '@angular/router';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrl: './product-home.component.scss',
  providers: [ProductsStore]
})
export class ProductHomeComponent {
  constructor(public store: ProductsStore, public router:Router) {}

  
// convenience getters for template (optional)
  get query()     { return this.store.querySig(); }
  get category()  { return this.store.categorySig(); }
  get minPrice()  { return this.store.minPriceSig(); }
  get maxPrice()  { return this.store.maxPriceSig(); }


  showProductDetails(p:Product){
    this.router.navigate(['/products/produt-details', p.id]);
  }

}
