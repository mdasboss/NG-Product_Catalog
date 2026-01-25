import { computed, Injectable, signal } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs';
import { ProductService } from '../services/product.service';

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

  readonly products$ = this.select(s=>s.product);
  readonly loading$ = this.select(s=>s.loading);
  readonly error$ = this.select(s=>s.error);

  readonly filtered = computed(()=>{
    const products = this.get().product;
    const q = this.querySig().trim().toLowerCase();
    const cat = this.categorySig();
    const min = this.minPriceSig();
    const max = this.maxPriceSig();

    return products?.filter(p=>{
      const matchesQuery = !q || p.title.toLowerCase().includes(q);
      const matchCat = !cat || p.category === cat;
      const matchesMin = min == null || p.price >= min;
      const matchesMax = max == null || p.price >= max;
      return matchesQuery && matchCat && matchesMin && matchesMax;
    })
  })

  constructor(private api:ProductService) {
    super(initialState);
    this.load();
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
