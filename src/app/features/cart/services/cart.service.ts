import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CartItem, cartState } from '../models/cart.model';
import { BehaviorSubject, map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private isBrowser:boolean;

  private _state: cartState = {items:[]};
  private _items$ =  new BehaviorSubject<CartItem[]>([]);
  items$ = this._items$.asObservable();

  totalQty$ = this.items$.pipe(
    map(items => items.reduce((acc,item)=> acc + item.qty, 0))
  ) 

  totalAmount$ = this.items$.pipe(
    map(item=> item.reduce((acc, item)=> acc + item.qty * item.price,0))
  )



  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.restore();
   }

   private restore(){}
}
