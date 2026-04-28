import { computed, Injectable, signal } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { combineLatest, switchMap, tap } from 'rxjs';
import { ProductService } from '../services/product.service';
import { toObservable } from '@angular/core/rxjs-interop';

export interface Product{
  id:number,
  title:string,
  category:string,
  price:number
}

interface ProductState{
  product?:Product[],
  loading?:boolean,
  error?:string | null;
}

const initialState:ProductState ={
  product:[],
  loading:false,
  error:null
}

@Injectable()
export class ProductsStore extends ComponentStore<ProductState> {
  readonly querySig = signal<string>('');
  readonly categorySig = signal<string | null>(null);
  readonly minPriceSig = signal<number | null>(null);
  readonly maxPriceSig = signal<number | null>(null);

  readonly products$ = this.select(s => s.product ?? []);
  readonly loading$ = this.select(s=>s.loading);
  readonly error$ = this.select(s=>s.error);

  // New reactive selector for filtered products
  readonly filtered$ = this.select(
    combineLatest([
      this.products$,
      toObservable(this.querySig),
      toObservable(this.categorySig),
      toObservable(this.minPriceSig),
      toObservable(this.maxPriceSig)
    ]),
    ([products, q, cat, min, max]) => {
      const query = q.trim().toLowerCase();
      
      return products.filter(p => {
        const matchesQuery = !query || p.title.toLowerCase().includes(query);
        const matchCat = !cat || p.category === cat;
        const matchesMin = min == null || p.price >= min;
        const matchesMax = max == null || p.price <= max;  // Fixed: <= for upper bound
        return matchesQuery && matchCat && matchesMin && matchesMax;
      });
    }
  );


  constructor(private api:ProductService) {
    super(initialState);
    this.load();
     console.log(this.querySig());
  }
 
  
  
 // Effects
  readonly load = this.effect<void>(trigger$ =>
    trigger$.pipe(
      tap(() => this.patchState({ loading: true, error: null })),
      switchMap(() => this.api.getProductList()),
      tap({
        next: (product) => this.patchState({ product, loading: false }),
        error: () => this.patchState({ loading: false, error: 'Failed to load products' })
      })
    )
  );

}
