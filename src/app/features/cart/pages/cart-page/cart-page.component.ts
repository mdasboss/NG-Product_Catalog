import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {

items$: Observable<CartItem[]> = this.cart.items$;
  totalQty$ = this.cart.totalQty$;
  totalAmount$ = this.cart.totalAmount$

  constructor(private cart:CartService){}
  
  // Actions → delegate to service
  inc(it: CartItem) {
    this.cart.updateQty(it.productId, it.qty + 1);
  }

  dec(it: CartItem) {
    this.cart.updateQty(it.productId, it.qty - 1); // service removes when qty <= 0
  }

  remove(productId: number) {
    this.cart.removeItem(productId);
  }

  clear() {
    this.cart.clear();
  }

  // For *ngFor trackBy
  trackById = (_: number, it: CartItem) => it.productId;


}
