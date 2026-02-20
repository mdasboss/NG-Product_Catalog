import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { delay, Observable, of, shareReplay, tap } from "rxjs";

export interface Product {
    id: number,
    title: string,
    category: 'Phones' | 'Laptops' | string,
    price: number
}
@Injectable({providedIn:'root'})


export class ProductService{
    private baseUrl = environment.apiBase;
    private cache = new Map<number, Product>();
    

    constructor(private http:HttpClient){}

    getProductList(){
           return this.http.get<Product[]>(`${this.baseUrl}/products`).pipe(delay(200)) 
    }

    getById(id:number): Observable<Product>{
        const cached = this.cache.get(id);
        if(cached) return of(cached);
        return this.http.get<Product>(`${this.baseUrl}/products/${id}`).pipe(
            tap(p => this.cache.set(id,p)),
            shareReplay(1)
        )
    }



}