import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CartItem, cartState } from '../models/cart.model';
import { BehaviorSubject, map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

const CART_KEY = 'app_cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private isBrowser: boolean;

  private _state: cartState = { items: [] };
  private _items$ = new BehaviorSubject<CartItem[]>([]);
  items$ = this._items$.asObservable();

  totalQty$ = this.items$.pipe(
    map(items => items.reduce((acc, item) => acc + item.qty, 0))
  )

  totalAmount$ = this.items$.pipe(
    map(item => item.reduce((acc, item) => acc + item.qty * item.price, 0))
  )

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.restore();
  }

  private persist() {
    if (!this.isBrowser) return;
    localStorage.setItem(CART_KEY, JSON.stringify(this._state));
  }

  private emit(){
    this._items$.next([...this._state.items])
  }

  
  private restore() {
    if (!this.isBrowser) return;
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) this._state = JSON.parse(raw) as cartState;
    } catch { /* ignore parse errors */ }
    this.emit();
  }


  /** Add an item. If same id exists, increases qty. Ignores zero/negative qty inputs. */
addItem(item: CartItem) {
  if (!item || !item.productId) return;
  const inc = Math.floor(item.qty ?? 0);
  if (inc <= 0) return;

  const existing = this._state.items.find(i => i.productId === item.productId);

  if (existing) {
    existing.qty += inc;
  } else {
    // clone to avoid external references mutating our state
    this._state.items.push({ ...item, qty: inc });
  }

  this.persist();
  this.emit(); // emits a NEW array reference to subscribers
}

/** Set quantity for an item id. If qty <= 0, removes the item. */
updateQty(id: number, qty: number) {
  if (!id) return;

  const normalized = Math.max(0, Math.floor(qty ?? 0));
  const idx = this._state.items.findIndex(x => x.productId === id);
  if (idx === -1) return; // no item → no-op

  if (normalized === 0) {
    // remove when qty becomes 0
    this._state.items.splice(idx, 1);
  } else {
    // replace object to keep immutability discipline
    this._state.items[idx] = { ...this._state.items[idx], qty: normalized };
  }

  this.persist();
  this.emit();
}

/** Remove an item by id (no-op if it doesn't exist). */
removeItem(id: number) {
  if (!id) return;
  const before = this._state.items.length;
  this._state.items = this._state.items.filter(i => i.productId !== id);
  if (this._state.items.length === before) return; // no changes → no emit/persist

  this.persist();
  this.emit();
}

/** Clear the cart (no-op if already empty). */
clear() {
  if (this._state.items.length === 0) return; // avoid unnecessary work
  this._state.items = [];
  this.persist();
  this.emit();
}




}
